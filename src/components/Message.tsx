import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

export function Message({ message }: { message: ChatMessage }) {
  return (
    <div className="flex gap-3 text-sm text-slate-600">
      <Avatar>
        <AvatarFallback>
          {message.sender === "user" ? "PS" : "AI"}
        </AvatarFallback>
        {message.sender === "user" ? (
          <AvatarImage src="https://github.com/pedromssoares.png" />
        ) : (
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQA1jpTVrugJwXmZc6WPdw6VPSZ2Tm5mIq7A&s" />
        )}
      </Avatar>
      <p className="leading-relaxed">
        <span className="block font-bold text-slate-700">
          {message.sender === "user" ? "You:" : "AI:"}
        </span>
        {message.text}
      </p>
    </div>
  );
}
