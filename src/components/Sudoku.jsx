import { Button, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { Main, ButFlx, Box, But } from "./styledcomponents";

const input = `0 4 0 0 0 0 1 7 9
0 0 2 0 0 8 0 5 4
0 0 6 0 0 5 0 0 8
0 8 0 0 7 0 9 1 0
0 5 0 0 9 0 0 3 0
0 1 9 0 6 0 0 4 0
3 0 0 4 0 0 7 0 0
5 7 0 1 0 0 2 0 0
9 2 8 0 0 0 0 6 0`;
const hard = `1 0 0 0 0 7 0 9 0
0 3 0 0 2 0 0 0 8
0 0 9 6 0 0 5 0 0
0 0 5 3 0 0 9 0 0
0 1 0 0 8 0 0 0 2
6 0 0 0 0 4 0 0 0
3 0 0 0 0 0 0 1 0
0 4 0 0 0 0 0 0 7
0 0 7 0 0 0 3 0 0`;
const easy = `0 7 0 0 1 4 0 0 0
6 1 2 0 9 5 3 8 0
3 0 4 0 6 8 9 7 1
0 0 0 1 0 0 0 5 0
2 8 0 0 0 0 7 0 3
5 0 3 0 8 0 0 0 0
0 2 0 0 3 0 0 0 0
0 0 6 8 0 0 1 0 5
0 0 0 6 7 0 4 3 0`;
const init = (f) => {
  return f.split("\n").map((row) => {
    return row.trim().split(" ").map(Number);
    //row.length === 9 ? row : false;
  });
};
const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    border: "none",
    height: "50px",
    color: "darkblue",
    fontSize: "20px",
    fontWeight: "700",
    padding: "5px 20px",
    margin: "5px"
  }
});
export default function Sudoku() {
  const classes = useStyles();
  const [sud, setSud] = useState(init(easy));
  const [man, setMan] = useState("");
  const [speed, setSpeed] = useState();
  const [pro, setPro] = useState(0);
  const [count, setCount] = useState(0);

  const slv = () => {
    if (speed === undefined) {
      alert(`Set the Delay Speed
        0 Meaning without Delay
        Increase Delay Speed if you want to see the progress of Algorithm`);
      return;
    }
    solver(sud, speed);
    //clearInterval(h);
  };

  // useEffect(() => {
  //   setPro(progress(sud));
  //   setSud(sud);
  // }, [count]);

  ////////////////////////////////

  async function solver(sud, speed) {
    //setSud(sud)
    let x = blank(sud);
    if (x === false) {
      console.log(sud);
      return true;
    }
    let [a, b] = x;
    for (let i = 1; i <= 9; i++) {
      sud[a][b] = i;
      setCount((pr) => pr + 1);
      setSud(sud);

      let see = check(sud, a, b, i);
      if (see) {
        await sleep(speed);

        if (await solver(sud, speed)) {
          setSud(sud);
          setCount((pr) => pr + 1);
          return true;
        } else {
          await sleep(speed);
          sud[a][b] = 0;
          setCount((pr) => pr + 1);
          setSud(sud);
        }
      } else {
        sud[a][b] = 0;
        setCount((pr) => pr + 1);
        setSud(sud);
      }
    }
    return false;
  }

  function blank(sud) {
    let g = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        g++;
        if (sud[i][j] === 0) {
          setPro(((g / 81) * 100).toFixed(2));
          return [i, j];
        }
      }
    }
    return false;
  }

  //   const show = () => {
  //     setCount((pr) => pr + 1);
  //   };
  const load = () => {
    let d = init(hard);
    setSud(d);
    // setPro(progress(sud));
    // console.log(pro);
    setCount((pr) => pr + 1);
  };
  const manual = () => {
    let d = init(man);
    console.log(d.length);
    if (
      d.length !== 9 ||
      d[0].length !== 9 ||
      d[1].length !== 9 ||
      d[2].length !== 9 ||
      d[3].length !== 9 ||
      d[4].length !== 9 ||
      d[5].length !== 9 ||
      d[6].length !== 9 ||
      d[7].length !== 9 ||
      d[8].length !== 9
    ) {
      window.alert(`Invalid Entry for Sudoku
       Must Contain 9 Lines
       In Each Line Enter 9 single digit Number With spaces Between Them
       If Number is Unknown/to be Filled Enter 0
      `);
      return;
    }
    setSud(d);
    // setPro(progress(sud));
    setCount((pr) => pr + 1);
  };
  return (
    <>
      <h1>This is Sudoku Solver done with a Backtracking Algorithm</h1>
      <h2>Beauty of computer science :)</h2>
      <h2>{pro === 100 ? "SUDOKU SOLVED" : ""}</h2>
      <Main>
        <div>
          {sud.map((el) => (
            <div style={{ display: "flex" }} key={uuid()}>
              {el.map((r) => (
                <Box key={uuid()}>{r === 0 ? "" : r}</Box>
              ))}
            </div>
          ))}
        </div>
        <textarea
          type="text"
          placeholder="Enter Sudoku Here"
          value={man}
          onChange={(e) => setMan(e.target.value)}
          cols="9"
          rows="9"
        />
      </Main>
      <h2>Progress Is {pro}</h2>
      <ButFlx>
        <div>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            placeholder="   Enter Delay Speed"
            maxLength={2}
          />
          <But
            variant="conatined"
            className={classes.root}
            onClick={() => setSpeed(speed)}
          >
            Set Delay
          </But>
        </div>
        <div>
          <But
            variant="contained"
            className={classes.root}
            onClick={() => setSud(init(input))}
          >
            Load Normal Sudoku
          </But>
          <But onClick={load}>Load Hardest Sudoku</But>
          <But onClick={manual}>Load Manual Sudoku</But>
        </div>
        <But onClick={slv}>Solve</But>
      </ButFlx>
      <h2>Sample Sudokus to Test</h2>
      <Main>
        <textarea type="text" value={easy} />
        <textarea type="text" value={input} />
        <textarea type="text" value={hard} />
      </Main>
      <a href="l">
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.Qnpj8aU5VhwS5cw3WrSq_AHaHa&pid=Api&P=0&w=300&h=300"
          alt=""
          style={{ width: "50px", padding: "25px" }}
        />
      </a>
    </>
  );
}

function check(sud, r, c, n) {
  for (let i = 0; i < 9; i++) {
    if (sud[r][i] === n) {
      if (i !== c) {
        return false;
      }
    }
    if (sud[i][c] === n) {
      if (i !== r) {
        return false;
      }
    }
  }
  let x = r - (r % 3);
  let y = c - (c % 3);
  for (let i = x; i < x + 3; i++) {
    for (let j = y; j < y + 3; j++) {
      if (i === r && j === c) {
        continue;
      }
      if (sud[i][j] === n) {
        return false;
      }
    }
  }
  return true;
}

function progress(sud) {
  let cnt = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sud[i][j] === 0) {
        cnt++;
      }
    }
  }
  let pro = (1 - cnt / 81) * 100;
  return pro.toFixed(2);
}

function sleep(miliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, miliseconds);
  });
}

// function sleep(miliseconds) {
//   var currentTime = new Date().getTime();

//   while (currentTime + miliseconds >= new Date().getTime()) {}
// }
