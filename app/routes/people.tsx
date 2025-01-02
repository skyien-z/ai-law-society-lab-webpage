import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Peopleee!" },
  ];
}

export default function Home() {
  return <><Welcome /><p>hi</p></>;
}