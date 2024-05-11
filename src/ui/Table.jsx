import { cloneElement, createContext, useContext, useState } from "react";
import styled from "styled-components";
import { HiOutlinePlus, HiOutlineXMark } from "react-icons/hi2";
import { useClickOutside } from "../hooks/useClickOutside";
import { useKey } from "../hooks/useKey";
import Filter from "./Filter";
import SortBy from "./SortBy";
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
const Overlay = styled.div`
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-sm);
  padding: 5.5rem 3rem;
`;
const ButtonModal = styled(Button)`
  position: fixed;
  top: 1rem;
  right: 1rem;
`;
const TableOperation = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1rem;
`;
const TableContext = createContext();
function Table({
  children,
  columns,
  title,
  searchBy,
  filterOptions = [],
  filterValue = "",
  sortOptions = [],
  allowFilter = false,
  allowSort = false,
}) {
  const [searchQuery, setSearchQurey] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const close = () => setOpenModal(false);
  function handelOpen() {
    setOpenModal(true);
  }
  function handleSearchQeruy(e) {
    setSearchQurey(e.currentTarget.value);
  }
  return (
    <TableContext.Provider
      value={{ columns, searchQuery, searchBy, openModal, close }}
    >
      <StyledTable>
        <header>
          <h3>{title}</h3>
          <Button onClick={handelOpen}>
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
        <TableOperation>
          {allowFilter && (
            <Filter options={filterOptions} filterValue={filterValue} />
          )}
          {allowSort && <SortBy options={sortOptions} />}
        </TableOperation>
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
function Window({ children }) {
  const { close, openModal } = useContext(TableContext);
  const ref = useClickOutside(close);
  useKey("Escape", close);
  if (!openModal) return null;
  return (
    <Overlay>
      <StyledModal ref={ref}>
        <ButtonModal onClick={() => close()}>
          <HiOutlineXMark />
        </ButtonModal>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>
  );
}
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Window = Window;
Table.Footer = Footer;
export default Table;
