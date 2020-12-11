import Display from "./Display";
import Clear from "./Clear";
import ClearEntry from "./ClearEntry";
import ClearOne from "./ClearOne";
import Parenthesis from "./Parenthesis";
import NumberComp from "./NumberComp";
import Operator from "./Operator";
import Decimal from "./Decimal";
import Compute from "./Compute";
import {useState, useEffect} from 'react';

const numbersArray = [{nb: "0", nbStr:"zero"}, {nb: "1", nbStr:"one"} ,{nb: "2", nbStr:"two"} ,{nb: "3", nbStr:"three"} ,{nb: "4", nbStr:"four"} ,{nb: "5", nbStr:"five"} ,{nb: "6", nbStr:"six"}, {nb: "7", nbStr:"seven"}, {nb: "8", nbStr:"eight"}, {nb: "9", nbStr:"nine"}];
const operatorsArray = [{opSign:"/", opName:"divide"}, {opSign:"*", opName:"multiply"}, {opSign:"+", opName:"add"}, {opSign:"-", opName:"subtract"}];

const Calculator = () => {
  const [currentOp, setCurrentOp] = useState("");
  const [expression, setExpression] = useState("0");
  const [result, setResult] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");
  
  useEffect(() => {
    let lastNumber = expression.match(/\d+([.]{1}\d*)?$/g);
    if(lastNumber === null)
      lastNumber = "";
    else{
      lastNumber = expression.match(/\d+([.]{1}\d*)?$/g)[0];
      console.log(lastNumber);
    }
    setCurrentNumber(lastNumber);
  }, [expression]);
  
  return(
    <div id="calculator">
      <Display expression={expression} result={result}/>
      <Clear setExpression={setExpression} setResult={setResult}/>
      <ClearEntry expression={expression} setExpression={setExpression} currentNumber={currentNumber} setCurrentNumber={setCurrentNumber}/>
      <ClearOne expression={expression} setExpression={setExpression}/>
      <Parenthesis id="parenthesisLeft" side="(" expression={expression} setExpression={setExpression}/>
      <Parenthesis id="parenthesisRight" side=")" expression={expression} setExpression={setExpression}/>
      {numbersArray.map((numb) => <NumberComp key={numb.nb} number={numb.nb} id={numb.nbStr} expression={expression} setExpression={setExpression} currentNumber={currentNumber}/>)}
      
      {operatorsArray.map((operator) => <Operator key={operator.opName} operator={operator.opSign} id={operator.opName} expression={expression} setExpression={setExpression} result={result}/>)}
      <Decimal expression={expression} setExpression={setExpression} currentNumber={currentNumber}/>
      <Compute expression={expression} setExpression={setExpression} setResult={setResult}/>
    </div>
  );
}

export default Calculator;
