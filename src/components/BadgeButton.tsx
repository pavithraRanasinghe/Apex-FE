import React, { FC, MouseEventHandler } from "react";
import { Badge, Button } from "react-bootstrap";

type BadgeProps = {
  onClick: MouseEventHandler;
  count: number;
  text: string;
  variant: string;
};

const BadgeButton: FC<BadgeProps> = (props: BadgeProps) => {
  return (
    <Button variant={props.variant} onClick={props.onClick}>
      {props.text} <Badge bg="dark">1</Badge>
      <span className="visually-hidden"></span>
    </Button>
  );
};

export default BadgeButton;
