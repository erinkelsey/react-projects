import React, { useCallback, useReducer } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error("Should not be reached");
  }
};

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...currentHttpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.errorData };
    case "CLEAR":
      return { ...currentHttpState, error: null };
    default:
      throw new Error("Should not be reached");
  }
};

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null
  });

  const addIngredientHandler = async ingredient => {
    try {
      dispatchHttp({ type: "SEND" });
      const firebaseURL = process.env.REACT_APP_FIREBASE_DB_URL;
      const response = await fetch(firebaseURL + "/ingredients.json", {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" }
      });

      const responseData = await response.json();

      dispatchHttp({ type: "RESPONSE" });
      dispatch({
        type: "ADD",
        ingredient: { id: responseData.name, ...ingredient }
      });
    } catch (error) {
      dispatchHttp({ type: "ERROR", errorData: error.message });
    }
  };

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const removeIngredientHandler = async ingredientId => {
    try {
      dispatchHttp({ type: "SEND" });
      const firebaseURL = process.env.REACT_APP_FIREBASE_DB_URL;
      await fetch(firebaseURL + `/ingredients/${ingredientId}.json`, {
        method: "DELETE"
      });

      dispatchHttp({ type: "RESPONSE" });
      dispatch({ type: "DELETE", id: ingredientId });
    } catch (error) {
      dispatchHttp({ type: "ERROR", errorData: error.message });
    }
  };

  const clearErrorHandler = () => {
    dispatchHttp({ type: "CLEAR" });
  };

  return (
    <div className='App'>
      {httpState.error && (
        <ErrorModal onClose={clearErrorHandler}>{httpState.error}</ErrorModal>
      )}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
