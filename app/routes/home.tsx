import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Motion Explorations" },
    { name: "description", content: "Motion!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
