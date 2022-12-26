import React from "react";

export const CompleteTodos = (prop) => {
  const { completeTodos, onClickBack, disabled } = prop;
  return (
    <div className="complete-area">
      <p className="title">完了のTODO</p>
      <ul>
        {completeTodos.map((todo, index) => {
          return (
            <li key={todo}>
              <div className="list-row">
                <p className="task">{todo}</p>
                <button disabled={disabled} onClick={() => onClickBack(index)}>
                  戻す
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
