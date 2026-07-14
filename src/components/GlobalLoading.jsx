import { useLoading } from "../contexts/LoadingContext";

function GlobalLoading() {
  const { isLoading } = useLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="global_loading">
      <div className="global_loading_spinner" />
    </div>
  );
}

export default GlobalLoading;