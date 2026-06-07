import { Suspense } from "react";
import LegalPage from "./LegalPage";

export default function Page() {
  return (
    <Suspense>
      <LegalPage />
    </Suspense>
  );
}