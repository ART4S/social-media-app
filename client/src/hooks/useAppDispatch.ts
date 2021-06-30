import { useDispatch } from "react-redux";
import type { AppState } from "redux/store";

export default function useAppDispatch() {
  return useDispatch<AppState>();
}
