import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const LiveStream = ({ roomID, userID }) => {
  const containerRef = useRef(null);

  const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
  const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET;

  useEffect(() => {
    const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userID
    );

    if (token && ZegoUIKitPrebuilt) {
      const zp = ZegoUIKitPrebuilt.create(token);
      zp.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role: ZegoUIKitPrebuilt.Host,
          },
        },
        sharedLinks: [
          {
            name: "Copy Link",
            url: `${window.location.origin}?roomID=${roomID}`,
          },
        ],
      });
    }
  }, [roomID, userID]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen zego_container"
    />
  );
};

export default LiveStream;
