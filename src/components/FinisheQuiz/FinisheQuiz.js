import React from 'react';
import classes from './FinisheQuiz.module.scss'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinisheQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }

        return total
    }, 0)
    
    return (
        <div className={classes.FinisheQuiz}>
            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]
                    
                    return (
                        <li 
                            key={index}
                        >
                            <strong>{index + 1}. </strong>
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )

                }) }
            </ul>
            <p>Вірних {successCount} з {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRetry} type="primary">Повторити</Button>
                <Link
                    to="/"
                >
                    <Button type="success">Перейти до списку тестів</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinisheQuiz