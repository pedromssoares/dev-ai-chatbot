# ChatBot for Software Development

This project is a chatbot that answers questions related to software development using the OpenAI API. The chatbot is configured to respond only to software development queries and to reply in the same language as the user’s prompt. It uses streaming to display responses gradually, creating an interactive experience.

## Features

- **Specialized Responses:**  
  The chatbot is set up to answer only questions about software development.
- **Language Detection:**  
  It responds in the same language as the user’s input.
- **Streaming Responses:**  
  Answers are sent in real time, with the text gradually revealed as the data is received.
- **Modern UI:**  
  Built with custom components for an elegant and responsive interface.

## Technologies Used

- **Next.js:** React framework for server-side rendering and API routes.
- **OpenAI API:** Integration with the GPT-4o-mini model (or your chosen model) to generate responses.
- **Streaming with Fetch API:** Uses the ReadableStream API to process data in real time.
- **Tailwind CSS (or similar):** For styling and UI components.
- **Vercel:** For deployment and hosting.

## Project Structure

├── app
│   ├── api
│   │   └── chat
│   │       └── route.ts         # API route for processing the chat with streaming
│   └── page.tsx                 # Main page that uses the Chat component
├── components
│   ├── Chat.tsx                 # Chat component for sending and receiving messages
│   └── Message.tsx              # Component for rendering each individual message
├── lib
│   └── openai.ts                # Configuration and instantiation of the OpenAI client
├── package.json
└── README.md

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2.	**Install dependencies:**

    ```
    npm install
    ```
    or
    ```
    yarn install
    ```

## Environment Variables

Create a .env.local file in the root of your project and set the following variable:

```
OPENAI_API_KEY=your_openai_api_key_here
```

Additional variables (e.g., OPENAI_BASE_URL) can be added if needed.

## How to Run

To run the project in development mode:

```
npm run dev
```
or
```
yarn dev
```

Then open http://localhost:3000 in your browser to test the chatbot.

## Customizations
### Changing the Model or Parameters:
To modify the model or other parameters of the OpenAI API, adjust the call in app/api/chat/route.ts.
### Improving the Prompt:
If you want to further refine the chatbot’s behavior, modify the system message in the API call to set the desired context.

## Contributing

Contributions are welcome! If you would like to help improve this project, please open an issue or submit a pull request.

License

This project is licensed under the MIT License.
