import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { HiOutlinePlus } from "react-icons/hi2";
const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 5px;
  overflow: hidden;
  margin: 1rem 0;
  padding: 1.5rem 2.5rem;
  box-shadow: var(--shadow-md);

  & header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & h3 {
      text-transform: uppercase;
      color: var(--color-grey-500);
      font-weight: 600;
      letter-spacing: 2px;
      font-size: 22px;
    }
  }
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
const Button = styled.button`
  background: none;
  border: none;
  outline: none;
  transform: scale(1);
  transition: all 0.2s;
  &:hover {
    transform: scale(1.2);
  }
  &:focus {
    outline: none;
  }
  & svg {
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-brand-500);
  }
`;
const StyledSearch = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 1rem 0;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid var(--color-grey-200);
  padding: 0rem 1.5rem;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;
const TableContext = createContext();
function Table({ children, columns, title, searchBy }) {
  const [searchQuery, setSearchQurey] = useState("");
  function handleSearchQeruy(e) {
    setSearchQurey(e.currentTarget.value);
  }
  return (
    <TableContext.Provider value={{ columns, searchQuery, searchBy }}>
      <StyledTable>
        <header>
          <h3>{title}</h3>
          <Button>
            <HiOutlinePlus />
          </Button>
        </header>
        <StyledSearch>
          <Input
            type="text"
            placeholder="search"
            onChange={handleSearchQeruy}
          />
        </StyledSearch>
        {children}
      </StyledTable>
    </TableContext.Provider>
  );
}
function Header({ children }) {
  const { columns } = useContext(TableContext);
  return <StyledHeader columns={columns}>{children}</StyledHeader>;
}
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return <StyledRow columns={columns}>{children}</StyledRow>;
}
function Body({ data, render }) {
  const { searchQuery, searchBy } = useContext(TableContext);
  if (data.length === 0) return <Empty>No data to be viewed</Empty>;
  const displayData = searchQuery
    ? data.filter((x) => x[searchBy].toLowerCase().includes(searchQuery))
    : data;
  if (displayData.length === 0) return <Empty>No data to be viewed</Empty>;

  return <StyledBody>{displayData.map(render)}</StyledBody>;
}
function Window({ children }) {}
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Window = Window;
Table.Footer = Footer;
export default Table;
