class Calculator {
    constructor(prevTextElement, currentTextElement) {
        this.prevTextElement = prevTextElement
        this.currentTextElement = currentTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        let Zero = true

        if(Zero && number === 0) {
            Zero = false
            this.clear()
            this.prevTextElement.innerText = 'Error'
        }
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
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

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
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
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }

    getDisplayNum(number) {
        const stringNum = number.toString()
        const intDig = parseFloat(stringNum.split('.')[0])
        const decDig = stringNum.split('.')[1]
        let intDisplay
        if (isNaN(intDig)) {
            intDisplay = ''
        }else{
            intDisplay = intDig.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decDig != null) {
            return `${intDisplay}.${decDig}`
        }else{
            return intDisplay
        }
    }

    updateDisplay() {
        this.currentTextElement.innerText = this.getDisplayNum(this.currentOperand)
        if (this.operation != null) {
            this.prevTextElement.innerText = `${this.getDisplayNum(this.previousOperand)} ${this.operation}`
        } else {
            this.prevTextElement.innerText = ''
        }
        
    }

}


const numberButtons = document.querySelectorAll('[data-num]')
const opsButtons = document.querySelectorAll('[data-ops]')
const equalButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const delButton = document.querySelector('[data-del]')
const prevTextElement = document.querySelector('[data-prev]')
const currentTextElement = document.querySelector('[data-current]')

const calculator = new Calculator(prevTextElement, currentTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

opsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})