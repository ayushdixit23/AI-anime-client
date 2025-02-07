import React from "react";

interface ClientanimeProps {
  anidata: any;
}

const Clientanime: React.FC<ClientanimeProps> = ({ anidata }) => {
  return (
    <div>
      <div>Anime Data: {JSON.stringify(anidata)}</div>
    </div>
  );
};

export default Clientanime;
