import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

import notes from "../notes";

const createNotes = (noteItem) => (
  <Note title={noteItem.title} content={noteItem.content} />
);

const App = () => (
  <div>
    <Header />
    {notes.map(createNotes)}
    <Footer />
  </div>
);
export default App;
