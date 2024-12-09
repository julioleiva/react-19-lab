import { useFormState } from 'react-dom';

const UseFormState = () => {
    const submitForm = (prevState, queryData) => {
        const name =  queryData.get("username"); 
        
        console.log(prevState);
        
        if (name === 'john') {
            return {
                success: true,
                text: "Welcome"
            }
        } else {
            return {
                success: false,
                text: "Error" 
            }
        }
    }

    const [message, formAction] = useFormState(submitForm, null);

    return (
        <form action={formAction}>
            <input type="text" name="username" />
            <button>Submit</button>
            {message && <h1>{message.text}</h1>}
        </form>
    );
}

export default UseFormState;
