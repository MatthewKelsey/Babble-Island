


export default function chatGPT() {
  const [input, setInput] = useState('');
    const [message, setMessage] = useState();
  
    const handleInput = async (event) => {
      setInput(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch(
          'https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`
          },
          body: JSON.stringify({
            prompt: input,
            max_tokens: 100,
            n: 1,
            stop: null,
            temperature: 0.5,
            model: 'text-davinci-002'
          })
        });
        const json = await response.json();
        
        console.log(json)
        setMessage(json.choices[0].text);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <>
      
          <button onClick = {handleClick}></button>
          {message && <DialogueBox message = {message} setMessage={setMessage}/>}
          <form onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={handleInput} />
          <button type="submit">Submit</button>
        </form>
        {/* <p>{response}</p> */}
      </>
    );


}
