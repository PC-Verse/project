import  React from 'react'

// function Greet() {
//     return <h1>Welcome to PC Verse!</h1>
// }

const Greet = (props) => {
    return (
        <div>
            <h1>Hello {props.name}, Welcome to PC Verse!</h1>
            {props.children}
        </div>
    )
}
// export const Greet = () => <h1> Named Export. Will need to export with "export { Greet } from path"</h1>

// JSX
/*
const Greet = () => {
    return (
        <h1>Welcome to Pc Verse!</h1>
    )
}
*/

// Not using JSX
/*
const Greet = () => {
    return React.createElement('h1', null, 'Welcome to PC Verse!')
}
*/

export default Greet    // allows us to export it with any name