import { useState } from "react";
import { ParticipantsPanel } from "./ParticipantsPanel";
import { ChatPanel } from "./ChatPanel";
import { GroupsPanel } from "./GroupsPanel";
import "./ForumPage.css";

export function ForumPage() {
  return (
    <div className="forum-container">
      <ParticipantsPanel />
      <ChatPanel />
      <GroupsPanel />
    </div>
  );
}
