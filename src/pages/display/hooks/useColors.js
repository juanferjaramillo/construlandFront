import { useSelector } from "react-redux";

export default function useColors () {
    const colorPrimario = `#${useSelector(
        (state) => state.users?.authUser?.owner?.colorPrimario
      )}`;
      const colorSecundario = `#${useSelector(
        (state) => state.users?.authUser?.owner?.colorSecundario
      )}`;
      const colorTerciario = `#${useSelector(
        (state) => state.users?.authUser?.owner?.colorTerciario
      )}`;

      return {colorPrimario,colorSecundario,colorTerciario}
}