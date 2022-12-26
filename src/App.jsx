import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  //入力ボックスのステート処理
  const [todoText, setTodoText] = useState("");
  //未完了のTODOのステート処理
  const [incompleteTodos, setincompleteTodos] = useState([]);
  //完了のTODOのステート処理
  const [completeTodos, setcompleteTodos] = useState([]);

  //ボックスの入力内容取得
  const onChangeText = (event) => setTodoText(event.target.value);

  //追加ボタンイベント
  const onClickAdd = () => {
    //入力がない状態で追加された場合は処理せず終了する
    if (todoText === "") return;

    //分割代入で既存のTODOと新規のTODOを変数に代入
    const newTodos = [...incompleteTodos, todoText];
    //未完了のTODOにnewTodosを反映する
    setincompleteTodos(newTodos);
    //ボックスに入力内容が残らないよう初期化
    setTodoText("");
  };

  //削除ボタンイベント
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    //削除ボタンが押されたタスクを配列から削除する
    newTodos.splice(index, 1);
    //削除後の内容を未完了のTODOに反映する
    setincompleteTodos(newTodos);
  };

  //完了ボタンイベント
  const onClickComplete = (index) => {
    //完了のTODOに完了ボタンが押下された未完了タスクを追加する
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    //追加後の内容を完了のTODOに反映する
    setcompleteTodos(newCompleteTodos);

    //完了になったタスクを未完了から削除する
    onClickDelete(index);
  };

  //戻すボタンイベント
  const onClickBack = (index) => {
    //未完了のTODOに戻すボタンが押下された完了タスクを追加する
    const newTodos = [...incompleteTodos, completeTodos[index]];
    //追加後の内容を未完了のTODOに反映する
    setincompleteTodos(newTodos);

    //未完了になったタスクを完了から削除する
    const newCompleteTodos = [...completeTodos];
    //戻すボタンが押されたタスクを配列から削除する
    newCompleteTodos.splice(index, 1);
    //削除後の内容を完了のTODOに反映する
    setcompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録出来るTODOは5個までです。消化して下さい。
        </p>
      )}

      <IncompleteTodos
        incompleteTodos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos
        completeTodos={completeTodos}
        onClickBack={onClickBack}
        disabled={incompleteTodos.length >= 5}
      />
    </>
  );
};
