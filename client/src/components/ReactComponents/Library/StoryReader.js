import React, { useState, useEffect } from "react";

const BinaryAudioPlayer = ({ data }) => {
  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    const audioBlob = new Blob([data], { type: "audio/wav" });
    setAudioBlob(URL.createObjectURL(audioBlob));
  }, [data]);

  return (
    <audio controls>
      <source src={audioBlob} type="audio/wav" />
    </audio>
  );
};

export default BinaryAudioPlayer;
