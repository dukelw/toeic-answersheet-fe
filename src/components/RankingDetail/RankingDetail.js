import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  findUser,
  getAnswer,
  getRankingListOfATest,
} from "../../redux/apiRequest";
import { useParams } from "react-router-dom";

function RankingDetail() {
  const dispatch = useDispatch();
  const [answerInfo, setAnswerInfo] = useState({});
  const [rankings, setRankings] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const answerInformation = await getAnswer(id, dispatch);
        setAnswerInfo(answerInformation);

        const rankingList = await getRankingListOfATest(id, dispatch);

        // Fetch user info for each ranking
        const updatedRankings = await Promise.all(
          rankingList.map(async (ranking) => {
            const userInfo = await findUser(ranking.userID, dispatch);
            console.log(ranking);
            return {
              ...ranking,
              userName: userInfo.metadata.user.name,
            };
          })
        );

        setRankings(updatedRankings);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  return (
    <Container
      sx={{
        width: isTablet ? "72%" : "100%",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {answerInfo && (
        <h1 style={{ width: isMobile ? "20%" : "100%" }}>
          Ranking of {answerInfo.name}
        </h1>
      )}

      {rankings.length > 0 ? (
        <TableContainer
          sx={{ width: isMobile ? "82vw" : "100%" }}
          component={Paper}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  ID
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  Score
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  Day Completed
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rankings.map((ranking, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f3f6f9" : "#ffffff",
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{ranking.userName}</TableCell>
                  <TableCell>
                    {ranking.highestScoreRecord.history_score}
                  </TableCell>
                  <TableCell>
                    {new Date(
                      ranking.highestScoreRecord.createdAt
                    ).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1>THIS TEST HAS NOT BEEN DONE BY ANY USER</h1>
      )}
    </Container>
  );
}

export default RankingDetail;
