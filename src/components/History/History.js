import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import FolderIcon from "@mui/icons-material/Folder";
import { getAnswer, getHistoryOfUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  createTheme,
  TextField,
  useMediaQuery,
} from "@mui/material";

const columns = [
  { id: "icon", label: "Icon", minWidth: 50, align: "center" },
  { id: "id", label: "ID", minWidth: 50, align: "center" },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "score", label: "Score", minWidth: 100, align: "center" },
  { id: "day", label: "Day", minWidth: 170, align: "center" },
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [keySearch, setKeySearch] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const histories = await getHistoryOfUser(userID, dispatch);
        const answers = await Promise.all(
          histories.map(async (history, index) => {
            const answer = await getAnswer(history.history_answer_id, dispatch);
            return {
              icon: <FolderIcon />,
              id: index + 1,
              name: answer.name,
              score: history.history_score,
              day: new Date(history.createdAt).toLocaleString(),
            };
          })
        );

        // Lọc những câu trả lời theo từ khóa tìm kiếm
        const filteredAnswers = keySearch
          ? answers.filter((answer) => answer.name.includes(keySearch))
          : answers;

        setHistoryData(filteredAnswers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userID) {
      fetchData();
    }
  }, [dispatch, userID, keySearch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearchChange = (e) => {
    setKeySearch(e.target.value);
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>TRIAL HISTORY</h1>
      <TextField
        label="Search Test"
        variant="outlined"
        fullWidth
        sx={{ mb: 3, maxWidth: isMobile ? 400 : "100%" }}
        onChange={handleSearchChange}
      />
      {currentUser ? (
        <Paper
          sx={{
            width: { xs: "30%", md: "100%" },
            overflow: "hidden",
            marginLeft: { xs: "0 20px " },
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {historyData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={historyData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <h1 style={{ fontSize: "60px", paddingBottom: "100px" }}>
          Please login to see your history
        </h1>
      )}
    </Container>
  );
}
