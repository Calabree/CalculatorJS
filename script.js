class Calculator {
    constructor(prevousOperandText, currentOperandText) {
        this.previousOperandText = prevousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = '';

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNum(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    getDisplayNum(number){
        const stringNum = number.toString()
        const integerDigits = parseFloat(stringNum.split('.'))
        const decimalDigits = stringNum.split('.')[1]
        let integerDisplayed
        if(isNaN(integerDigits)){
            integerDisplayed = ''
        }else{
            integerDisplayed = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits !=null){
            return `${integerDisplayed}.${decimalDigits}`
        }else{
            return integerDisplayed
        }
    }
    compute() {
        let computation
        let prev = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.previousOperand = ''
        this.currentOperand = computation
        this.operation = undefined
        
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNum(this.currentOperand)
        if(this.operation!=null){
            this.previousOperandText.innerText = `${this.getDisplayNum(this.previousOperand)} ${this.operation}`

        }else{
            this.previousOperandText.innerText = ''
        }
    }
}


//getting variables from our html
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-del]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandText = document.querySelector('[data-previous]')
const currentOperandText = document.querySelector('[data-current]')

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})