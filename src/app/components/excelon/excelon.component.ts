import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excelon',
  templateUrl: './excelon.component.html',
  styleUrls: ['./excelon.component.scss']
})
export class ExcelonComponent implements OnInit {
  constructor() { } 
  public arr=[
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', ''
  ]
  
  ngOnInit(): void {
  }
  public dapan: string="";
  
  infixToPostFix1(TestString: String) {

    this.dapan = this.readInput(TestString);

    return  this.dapan;
  }

   public readInput(input){
    let stack = [];
    let answer = [];
    
    for (let i = 0; i < input.length; i++) {
      if(input[i] == ' '){
        continue;
      }
      if (/\d+/.test(input[i])) {
        answer.push(input[i])
        while(/\d+/.test(input[i+1])){
          let temp = answer.pop() + input[i+1];
          answer.push(temp);
          i++;
        }
      }else if(input[i] == ")"){
        while (stack[stack.length-1] != '(') {
          answer.push(stack.pop());
        }
        stack.pop();
      }else { 
      operatorCheck(stack,input[i],answer)
    }
    }
    while(stack.length!=0){
      answer.push(stack.pop());
    }
    console.log(answer);
    console.log("stack:" +stack)
    console.log(executePostfix(answer));

    return executePostfix(answer);

  }
  
}

    function executePostfix(arr=[]) {
      let stack = [], operand1, operand2, tempOperand;
      let operators = ['+', '-', '*', '/'];
      for (let i = 0; i<arr.length;i++) {
        // char = str.charAt(i);
        console.log("dau"+operators.indexOf(arr[i]));
        if (operators.indexOf(arr[i]) >= 0) {
          // operate
          operand2 = stack.pop();
          operand1 = stack.pop();
          tempOperand = eval(operand1 + arr[i] + operand2);
          stack.push(tempOperand);
        } else {
          stack.push(arr[i]);
          console.log(stack)
        }
      }
      return stack.pop();
    }

    function operatorCheck(stack=[],x:string,answer=[]){
      if (stack.length == 0) {
        stack.push(x);
      }else if (operands(x) > operands(stack[stack.length-1])) {
        stack.push(x);   
      }else{
        while(operands(x) <= operands(stack[stack.length-1]) && stack.length!=0 && stack[stack.length-1]!='('){
          answer.push(stack.pop());
        }
        stack.push(x);
      }
    }
    function operands(x:string){
      if (x == "(") {
        return 3;
      }
      if (x == "*" || x == "/") {
        return 2;
      }else if (x == "+" || x == "-") {
        return 1;
      }
    }
  