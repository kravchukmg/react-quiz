import React, { Component } from 'react';
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinisheQuiz from '../../components/FinisheQuiz/FinisheQuiz'

class Quiz extends Component {
    state = {
        results: {},  // { [id]: 'success' 'error' }
        isFinished: false,
        activeQuestion: 0,
        answerState: null,  // { [id]: 'success' 'error' }
        quiz: [
            {
                question: 'Якого кольору небо?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'Чорного', id: 1},
                    {text: 'Синього', id: 2},
                    {text: 'Червоного', id: 3},
                    {text: 'Зеленого', id: 4}
                ]
            },
            {
                question: 'Вякому році заснували Київ?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: '987', id: 1},
                    {text: '1650', id: 2},
                    {text: '482', id: 3},
                    {text: '1325', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizeFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    isQuizeFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
        })
    }
    
    render() {
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Дайте відповідь на запитання</h1>
                    
                    {
                        this.state.isFinished
                            ? <FinisheQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                                />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                                />
        
                    }
                </div>
            </div>
        )
    }
}

export default Quiz;