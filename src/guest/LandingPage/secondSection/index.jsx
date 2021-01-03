import React from 'react'

function SecondSection() {
    return (
<React.Fragment>
            <div className={"component pb-3 bg-light text-dark"} >
                <div className={"container text-center "} >
                    <h2 className="p-5 text-violet">Benefits</h2>              
                    <ul style={{textAlign:"left"}}>
                        {list.map((item, index) => (<li key={ index}>{ item}</li>))}
                    </ul>
                </div>  
            </div>
        </React.Fragment>
    )
}
const list = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Vivamus accumsan felis nec varius sollicitudin.",
    "Morbi consequat lacus fermentum erat posuere, in consequat urna vehicula.",
    "Donec non mauris laoreet, pellentesque purus non, ornare leo.",
    "Vivamus blandit turpis vel viverra viverra.",
    "Nam ultrices lectus eget eros lacinia, a aliquet tortor malesuada.",
    "Mauris nec elit et mauris tempor ullamcorper non vitae nisl.",
    "Sed eu ex nec ex feugiat eleifend.",
    "Nullam congue nisi vel ligula finibus, ac fringilla mi malesuada."]

export  {SecondSection }
