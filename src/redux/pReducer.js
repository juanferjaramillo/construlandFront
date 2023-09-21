import {
  GET_PRODS_USER,
  GET_ALL_PRODUCTS,
  FILTER_BY_PROVIDER,
  FILTER_BY_NAME,
  RESET_BOARD,
  FILTER_BY_CATEG,
  FILTER_BY_DISPONIBILITY,
  FILTER_BY_PROPERTY,
  SELL,
  CLEAR_SELLS,
  FILTER_BY_CURRENTSELL,
  CLEAR_PRODS,
} from "./actions";

const initialState = {
  allProducts: JSON.parse(sessionStorage.getItem("allProducts")) || [],
  filteredProducts: JSON.parse(sessionStorage.getItem("allProducts")) || [],
  providers: JSON.parse(sessionStorage.getItem("providers")) || [],
  categories: JSON.parse(sessionStorage.getItem("categ")) || [],
  sell: {},
  sellValue: 0,
};

const pReducer = (state = initialState, action) => {
  //console.log(`action: ${action.type}`);

  switch (action.type) {
    case GET_PRODS_USER:
      return {
        ...state,
        allProducts: action.payload.prodUser,
        filteredProducts: action.payload.prodUser,
        providers: action.payload.prove,
        categories: action.payload.categ,
      };

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload.allProds,
        filteredProducts: action.payload.allProds,
      };

    case FILTER_BY_PROVIDER:
      let prodsProvider = [];
      prodsProvider = state.allProducts.filter(
        (prod) => prod.provider.name === action.payload
      );
      return {
        ...state,
        filteredProducts: prodsProvider,
      };

    case FILTER_BY_CATEG:
      let prodsCateg = [];
      prodsCateg = state.allProducts.filter(
        (prod) => prod.category.name === action.payload
      );
      return {
        ...state,
        filteredProducts: prodsCateg,
      };

    case FILTER_BY_NAME:
      //let prodsName = [];
      const prodsName = state.allProducts.filter((p) =>
        p.nombre.toLowerCase().includes(action.payload)
      );
      console.log(action.payload);
      const prodsCod = state.allProducts.filter((p) => {
        return String(p.id).padStart(3,'0').includes(action.payload);
      });
      
      // state.allProducts.filter((p) => p.nombre.toLowerCase().includes(action.payload));
      return {
        ...state,
        filteredProducts: [...prodsCod, ...prodsName],
      };

    case FILTER_BY_CURRENTSELL:
      // console.log("atendido por currentsell");
      let s = action.payload;
      let sells = [];
      for (let key in s) {
        // console.log("s",s);
        // console.log("key", key);
        Number(s[key]) > 0 &&
          sells.push(state.allProducts.filter((p) => p.id === Number(key))[0]);
        // console.log("this code in reducer", sells);
      }
      // console.log("sells in reducer", sells);
      return {
        ...state,
        filteredProducts: sells,
      };

    case CLEAR_PRODS:
      return {
        ...state,
        sell: {},
      };

    case RESET_BOARD:
      return {
        ...state,
        filteredProducts: [...state.allProducts],
      };

    case FILTER_BY_DISPONIBILITY:
      return {
        ...state,
        filteredProducts: state.filteredProducts.filter(
          (p) => p.stateId === action.payload
        ),
      };

    case FILTER_BY_PROPERTY:
      return {
        ...state,
        filteredProducts: state.filteredProducts.filter((p) => {
          const ic = p.icons.map((i) => i.id);
          return ic.includes(Number(action.payload));
        }),
      };

    case SELL:
      const prdId = action.payload[0];
      const qty = action.payload[1];
      const sv = action.payload[2];
      return {
        ...state,
        sell: { ...state.sell, [prdId]: qty },
        sellValue: state.sellValue + sv,
      };

    case CLEAR_SELLS:
      return {
        ...state,
        sell: action.payload,
        sellValue: 0,
      };

    default:
      return { ...state };
  }
};
export default pReducer;
