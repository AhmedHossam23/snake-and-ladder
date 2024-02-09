"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import axios from "axios";
import { BadgeInfo, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const Ladders = [
  { from: 2, to: 38 },
  { from: 4, to: 45 },
  { from: 9, to: 31 },
  { from: 33, to: 85 },
  { from: 52, to: 88 },
  { from: 80, to: 99 },
];

const Snakes = [
  { from: 51, to: 11 },
  { from: 56, to: 15 },
  { from: 79, to: 57 },
  { from: 92, to: 53 },
  { from: 76, to: 40 },
];

const Data = [
  {
    tile: 1,
    element: "p",
    details: `The <p> tag defines a paragraph. Browsers automatically add a single blank line before and after each <p> element.`,
  },
  {
    tile: 2,
    element: "h1",
    details: `The <h1> to <h6> tags are used to define HTML headings.`,
  },
  {
    tile: 3,
    element: "a",
    details: `The <a> tag defines a hyperlink, which is used to link from one page to another.`,
  },
  {
    tile: 4,
    element: "img",
    details: `The <img> tag is used to embed an image in an HTML page.`,
  },
  {
    tile: 5,
    element: "table",
    details: `The <table> tag defines an HTML table.`,
  },
  {
    tile: 6,
    element: "form",
    details: `The <form> tag is used to create an HTML form for user input.`,
  },
  {
    tile: 7,
    element: "input",
    details: `The <input> tag is used to create an input field in an HTML form.`,
  },
  {
    tile: 8,
    element: "select",
    details: `The <select> tag is used to create a dropdown list.`,
  },
  {
    tile: 9,
    element: "button",
    details: `The <button> tag is used to create a clickable button.`,
  },
  {
    tile: 10,
    element: "label",
    details: `The <label> tag is used to define a label for many form elements.`,
  },
  {
    tile: 11,
    element: "textarea",
    details: `The <textarea> tag defines a multi-line text input control.`,
  },
  {
    tile: 12,
    element: "strong",
    details: `The <strong> tag is used to define important text.`,
  },
  {
    tile: 13,
    element: "em",
    details: `The <em> tag is used to define emphasized text.`,
  },
  {
    tile: 14,
    element: "span",
    details: `The <span> tag is used to group inline-elements in a document.`,
  },
  {
    tile: 15,
    element: "div",
    details: `The <div> tag is used to group block-elements in a document.`,
  },
  {
    tile: 16,
    element: "ul",
    details: `The <ul> tag defines an unordered (bulleted) list.`,
  },
  {
    tile: 17,
    element: "ol",
    details: `The <ol> tag defines an ordered list.`,
  },
  {
    tile: 18,
    element: "li",
    details: `The <li> tag defines a list item.`,
  },
  {
    tile: 19,
    element: "dl",
    details: `The <dl> tag defines a description list.`,
  },
  {
    tile: 20,
    element: "dt",
    details: `The <dt> tag defines a term/name in a description list.`,
  },
  {
    tile: 21,
    element: "dd",
    details: `The <dd> tag is used to describe a term/name in a description list.`,
  },
  {
    tile: 22,
    element: "iframe",
    details: `The <iframe> tag specifies an inline frame.`,
  },
  {
    tile: 23,
    element: "canvas",
    details: `The <canvas> tag is used to draw graphics, on the fly, via scripting (usually JavaScript).`,
  },
  {
    tile: 24,
    element: "svg",
    details: `The <svg> tag is used to define a container for SVG graphics.`,
  },
  {
    tile: 25,
    element: "audio",
    details: `The <audio> tag is used to embed sound content in a document, such as music or other audio streams.`,
  },
  {
    tile: 26,
    element: "video",
    details: `The <video> tag is used to embed video content in a document, such as a movie clip or other video streams.`,
  },
  {
    tile: 27,
    element: "script",
    details: `The <script> tag is used to define a client-side script (JavaScript).`,
  },
  {
    tile: 28,
    element: "noscript",
    details: `The <noscript> tag is used to define an alternate content for users that have disabled scripts in their browser or have a browser that doesn't support client-side scripts.`,
  },
  {
    tile: 29,
    element: "style",
    details: `The <style> tag is used to define style information for an HTML document.`,
  },
  {
    tile: 30,
    element: "link",
    details: `The <link> tag is used to link to external style sheets.`,
  },
  {
    tile: 31,
    element: "meta",
    details: `The <meta> tag provides metadata about the HTML document. Metadata will not be displayed on the page, but will be machine parsable.`,
  },
  {
    tile: 32,
    element: "base",
    details: `The <base> tag specifies the base URL/target for all relative URLs in a document.`,
  },
  {
    tile: 33,
    element: "head",
    details: `The <head> tag is a container for all the head elements.`,
  },
  {
    tile: 34,
    element: "title",
    details: `The <title> tag is required in all HTML documents and it defines the title of the document.`,
  },
  {
    tile: 35,
    element: "body",
    details: `The <body> tag defines the document's body.`,
  },
  {
    tile: 36,
    element: "section",
    details: `The <section> tag defines a section in a document.`,
  },
  {
    tile: 37,
    element: "article",
    details: `The <article> tag specifies independent, self-contained content.`,
  },
  {
    tile: 38,
    element: "aside",
    details: `The <aside> tag defines some content aside from the content it is placed in.`,
  },
  {
    tile: 39,
    element: "header",
    details: `The <header> tag defines a header for a document or section.`,
  },
  {
    tile: 40,
    element: "footer",
    details: `The <footer> tag defines a footer for a document or section.`,
  },
  {
    tile: 41,
    element: "nav",
    details: `The <nav> tag defines a set of navigation links.`,
  },
  {
    tile: 42,
    element: "address",
    details: `The <address> tag defines the contact information for the author/owner of a document or an article.`,
  },
  {
    tile: 43,
    element: "hgroup",
    details: `The <hgroup> tag is used to group heading elements.`,
  },
  {
    tile: 44,
    element: "figure",
    details: `The <figure> tag specifies self-contained content, like illustrations, diagrams
    photos, code listings, etc.`,
  },
  {
    tile: 45,
    element: "figcaption",
    details: `The <figcaption> tag defines a caption for a <figure> element.`,
  },
  {
    tile: 46,
    element: "main",
    details: `The <main> tag specifies the main content of a document.`,
  },
  {
    tile: 47,
    element: "template",
    details: `The <template> tag is used to declare HTML fragments that will not be rendered, when the page is loaded, but can be instantiated at a later time.`,
  },
  {
    tile: 48,
    element: "slot",
    details: `The <slot> tag is used to define custom elements.`,
  },
  {
    tile: 49,
    element: "article",
    details: `The <article> tag specifies independent, self-contained content.`,
  },
  {
    tile: 50,
    element: "thead",
    details: `The <thead> tag is used to group header content in an HTML table.`,
  },
  {
    tile: 51,
    element: "tbody",
    details: `The <tbody> tag is used to group the body content in an HTML table.`,
  },
  {
    tile: 52,
    element: "tfoot",
    details: `The <tfoot> tag is used to group footer content in an HTML table.`,
  },
  {
    tile: 53,
    element: "tr",
    details: `The <tr> tag defines a row in an HTML table.`,
  },
  {
    tile: 54,
    element: "th",
    details: `The <th> tag defines a header cell in an HTML table.`,
  },
  {
    tile: 55,
    element: "td",
    details: `The <td> tag defines a standard cell in an HTML table.`,
  },
  {
    tile: 56,
    element: "caption",
    details: `The <caption> tag defines a table caption.`,
  },
  {
    tile: 57,
    element: "col",
    details: `The <col> tag specifies column properties for each column within a <colgroup> element.`,
  },
  {
    tile: 58,
    element: "colgroup",
    details: `The <colgroup> tag specifies a group of one or more columns in a table for formatting.`,
  },
  {
    tile: 59,
    element: "optgroup",
    details: `The <optgroup> tag is used to group related options in a drop-down list.`,
  },
  {
    tile: 60,
    element: "option",
    details: `The <option> tag is used to define an option in a drop-down list.`,
  },
  {
    tile: 61,
    element: "fieldset",
    details: `The <fieldset> tag is used to group related elements in a form.`,
  },
  {
    tile: 62,
    element: "legend",
    details: `The <legend> tag defines a caption for the <fieldset> element.`,
  },
  {
    tile: 63,
    element: "datalist",
    details: `The <datalist> tag specifies a list of pre-defined options for an <input> element.`,
  },
  {
    tile: 64,
    element: "output",
    details: `The <output> tag represents the result of a calculation (like one performed by a script).`,
  },
  {
    tile: 65,
    element: "progress",
    details: `The <progress> tag represents the completion progress of a task.`,
  },
  {
    tile: 66,
    element: "meter",
    details: `The <meter> tag defines a scalar measurement within a known range, or a fractional value.`,
  },
  {
    tile: 67,
    element: "details",
    details: `The <details> tag specifies additional details that the user can view or hide.`,
  },
  {
    tile: 68,
    element: "summary",
    details: `The <summary> tag defines a visible heading for the <details> element.`,
  },
  {
    tile: 69,
    element: "menu",
    details: `The <menu> tag defines a list/menu of commands.`,
  },
  {
    tile: 70,
    element: "menuitem",
    details: `The <menuitem> tag defines a command/menu item that the user can invoke from a popup menu.`,
  },
  {
    tile: 71,
    element: "dialog",
    details: `The <dialog> tag defines a dialog box or subwindow.`,
  },
  {
    tile: 72,
    element: "h2",
    details: `The <h1> to <h6> tags are used to define HTML headings.`,
  },
  {
    tile: 73,
    element: "blockquote",
    details: `The <blockquote> tag specifies a section that is quoted from another source.`,
  },
  {
    tile: 74,
    element: "cite",
    details: `The <cite> tag defines the title of a work.`,
  },
  {
    tile: 75,
    element: "q",
    details: `The <q> tag defines a short quotation.`,
  },
  {
    tile: 76,
    element: "abbr",
    details: `The <abbr> tag defines an abbreviation or an acronym.`,
  },
  {
    tile: 77,
    element: "b",
    details: `The <b> tag specifies bold text without any extra importance.`,
  },
  {
    tile: 78,
    element: "bdi",
    details: `The <bdi> tag isolates a part of text that might be formatted in a different direction from other text outside it.`,
  },
  {
    tile: 79,
    element: "bdo",
    details: `The <bdo> tag overrides the current text direction.`,
  },
  {
    tile: 80,
    element: "br",
    details: `The <br> tag inserts a single line break.`,
  },
  {
    tile: 81,
    element: "code",
    details: `The <code> tag is used to define a piece of computer code.`,
  },
  {
    tile: 82,
    element: "data",
    details: `The <data> tag links the content with a machine-readable translation.`,
  },
  {
    tile: 83,
    element: "dfn",
    details: `The <dfn> tag represents the defining instance of a term.`,
  },
  {
    tile: 84,
    element: "em",
    details: `The <em> tag is used to define emphasized text.`,
  },
  {
    tile: 85,
    element: "i",
    details: `The <i> tag defines a part of text in an alternate voice or mood.`,
  },
  {
    tile: 86,
    element: "kbd",
    details: `The <kbd> tag is used to define keyboard input.`,
  },
  {
    tile: 87,
    element: "mark",
    details: `The <mark> tag defines marked/highlighted text.`,
  },
  {
    tile: 88,
    element: "rp",
    details: `The <rp> tag can be used to provide fall-back parentheses for browsers that do not support display of ruby annotations.`,
  },
  {
    tile: 89,
    element: "rt",
    details: `The <rt> tag specifies an explanation or pronunciation of characters (for East Asian typography).`,
  },
  {
    tile: 90,
    element: "ruby",
    details: `The <ruby> tag specifies a ruby annotation for a text.`,
  },
  {
    tile: 91,
    element: "s",
    details: `The <s> tag specifies text that is no longer correct, accurate or relevant.`,
  },
  {
    tile: 92,
    element: "samp",
    details: `The <samp> tag is used to define sample output from a computer program.`,
  },
  {
    tile: 93,
    element: "small",
    details: `The <small> tag defines smaller text.`,
  },
  {
    tile: 94,
    element: "sub",
    details: `The <sub> tag defines subscript text.`,
  },
  {
    tile: 95,
    element: "sup",
    details: `The <sup> tag defines superscript text.`,
  },
  {
    tile: 96,
    element: "time",
    details: `The <time> tag defines a specific period in time.`,
  },
  {
    tile: 97,
    element: "u",
    details: `The <u> tag defines some text that is unarticulated and styled differently from normal text.`,
  },
  {
    tile: 98,
    element: "var",
    details: `The <var> tag is used to define a variable in programming or in a mathematical expression.`,
  },
  {
    tile: 99,
    element: "wbr",
    details: `The <wbr> tag defines a possible line-break.`,
  },
  {
    tile: 100,
    element: "hr",
    details: `The <hr> tag defines a thematic break in an HTML page, and is most often displayed as a horizontal rule.`,
  },
];

const Snake = ({ from, to }: { from: number; to: number }) => {
  const [dimentions, setDimentions] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    boardWidth: 0,
    boardHeight: 0,
    length: 0,
  });

  const steps = Math.floor(dimentions.length / 5);
  const stepsArray = Array.from({ length: steps }, (_, i) => i + 1);

  const snakeSteps = () => {
    return stepsArray.map((step, index) => {
      const x = (dimentions.x1 / dimentions.boardWidth) * 100;
      const y = (dimentions.y1 / dimentions.boardHeight) * 100;
      const x2 = (dimentions.x2 / dimentions.boardWidth) * 100;
      const y2 = (dimentions.y2 / dimentions.boardHeight) * 100;
      const xStep = x + ((x2 - x) / steps) * step;
      const yStep = y + ((y2 - y) / steps) * step;

      if (index === 0) {
        return (
          <path
            key={step}
            d={`M${xStep} ${yStep}`}
            stroke="#008000"
            fill="none"
          />
        );
      }

      const prevXStep = x + ((x2 - x) / steps) * (step - 1);
      const prevYStep = y + ((y2 - y) / steps) * (step - 1);
      return (
        <circle
          key={step}
          cx={prevXStep}
          cy={prevYStep}
          r="1"
          fill={index % 2 === 0 ? "#008000" : "#ff00"}
        />
      );
    });
  };

  useEffect(() => {
    const fromTile = document.querySelector(`.tile-${from}`) as HTMLElement;
    const toTile = document.querySelector(`.tile-${to}`) as HTMLElement;
    const board = document.querySelector(".board") as HTMLElement;

    const fromTileRect = fromTile.getBoundingClientRect();
    const toTileRect = toTile.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    setDimentions({
      x1: fromTileRect.left - boardRect.left + fromTileRect.width / 2,
      y1: fromTileRect.top - boardRect.top + fromTileRect.height / 2,
      x2: toTileRect.left - boardRect.left + toTileRect.width / 2,
      y2: toTileRect.top - boardRect.top + toTileRect.height / 2,
      boardWidth: boardRect.width,
      boardHeight: boardRect.height,
      length: Math.sqrt(
        Math.pow(toTileRect.left - fromTileRect.left, 2) +
          Math.pow(toTileRect.top - fromTileRect.top, 2)
      ),
    });
  }, [from, to]);

  return (
    <svg className="absolute snake w-full h-full z-50" viewBox="0 0 100 100">
      <path
        d={`M${(dimentions.x1 / dimentions.boardWidth) * 100} ${
          (dimentions.y1 / dimentions.boardHeight) * 100
        } L${(dimentions.x2 / dimentions.boardWidth) * 100} ${
          (dimentions.y2 / dimentions.boardHeight) * 100
        }`}
        stroke="#f0f"
        strokeWidth=".5"
        strokeDasharray={"1 1"}
      />
      {snakeSteps()}
      <circle
        cx={(dimentions.x2 / dimentions.boardWidth) * 100}
        cy={(dimentions.y2 / dimentions.boardHeight) * 100}
        r="1.5"
        fill="#f00"
      />
    </svg>
  );
};

const Ladder = ({ from, to }: { from: number; to: number }) => {
  const [dimentions, setDimentions] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    boardWidth: 0,
    boardHeight: 0,
    length: 0,
  });

  const steps = Math.floor(dimentions.length / 5);
  const stepsArray = Array.from({ length: steps }, (_, i) => i + 1);

  const ladderSteps = () => {
    return stepsArray.map((step, index) => {
      const x = (dimentions.x1 / dimentions.boardWidth) * 100;
      const y = (dimentions.y1 / dimentions.boardHeight) * 100;
      const x2 = (dimentions.x2 / dimentions.boardWidth) * 100;
      const y2 = (dimentions.y2 / dimentions.boardHeight) * 100;
      const xStep = x + ((x2 - x) / steps) * step;
      const yStep = y + ((y2 - y) / steps) * step;

      if (index === 0) {
        return (
          <path
            key={step}
            d={`M${xStep} ${yStep}`}
            stroke="#1f1fff85"
            fill="none"
          />
        );
      }

      const prevXStep = x + ((x2 - x) / steps) * (step - 1);
      const prevYStep = y + ((y2 - y) / steps) * (step - 1);
      return (
        <path
          key={step}
          d={`M${prevXStep} ${prevYStep} L${xStep} ${yStep}`}
          stroke={index % 4 === 0 ? "#1f1fff" : "#1f1fff0"}
          fill="none"
          strokeWidth={4}
        />
      );
    });
  };

  useEffect(() => {
    const fromTile = document.querySelector(`.tile-${from}`) as HTMLElement;
    const toTile = document.querySelector(`.tile-${to}`) as HTMLElement;
    const board = document.querySelector(".board") as HTMLElement;

    const fromTileRect = fromTile.getBoundingClientRect();
    const toTileRect = toTile.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    setDimentions({
      x1: fromTileRect.left - boardRect.left + fromTileRect.width / 2,
      y1: fromTileRect.top - boardRect.top + fromTileRect.height / 2,
      x2: toTileRect.left - boardRect.left + toTileRect.width / 2,
      y2: toTileRect.top - boardRect.top + toTileRect.height / 2,
      boardWidth: boardRect.width,
      boardHeight: boardRect.height,
      length: Math.sqrt(
        Math.pow(toTileRect.left - fromTileRect.left, 2) +
          Math.pow(toTileRect.top - fromTileRect.top, 2)
      ),
    });
  }, [from, to]);

  return (
    <svg className="absolute ladder w-full h-full z-50" viewBox="0 0 100 100">
      <path
        d={`M${(dimentions.x1 / dimentions.boardWidth) * 100 + 2} ${
          (dimentions.y1 / dimentions.boardHeight) * 100
        } L${(dimentions.x2 / dimentions.boardWidth) * 100 + 2} ${
          (dimentions.y2 / dimentions.boardHeight) * 100
        }`}
        stroke="#1f1fff"
        strokeWidth=".3"
      />
      <path
        d={`M${(dimentions.x1 / dimentions.boardWidth) * 100 - 2} ${
          (dimentions.y1 / dimentions.boardHeight) * 100
        } L${(dimentions.x2 / dimentions.boardWidth) * 100 - 2} ${
          (dimentions.y2 / dimentions.boardHeight) * 100
        }`}
        stroke="#1f1fff"
        strokeWidth=".3"
      />
      <path
        d={`M${(dimentions.x1 / dimentions.boardWidth) * 100 - 2} ${
          (dimentions.y1 / dimentions.boardHeight) * 100
        } L${(dimentions.x1 / dimentions.boardWidth) * 100 + 2} ${
          (dimentions.y1 / dimentions.boardHeight) * 100
        }`}
        stroke="#1f1fff"
        strokeWidth=".3"
      />
      <path
        d={`M${(dimentions.x2 / dimentions.boardWidth) * 100 - 2} ${
          (dimentions.y2 / dimentions.boardHeight) * 100
        } L${(dimentions.x2 / dimentions.boardWidth) * 100 + 2} ${
          (dimentions.y2 / dimentions.boardHeight) * 100
        }`}
        stroke="#1f1fff"
        strokeWidth=".3"
      />
      {ladderSteps()}
    </svg>
  );
};

const Player = ({
  number,
  position,
  name,
  bounce,
}: {
  number: number;
  position: number;
  name: string;
  bounce: boolean;
}) => {
  return (
    <span
      className={cn(
        "w-3 h-3 rounded-full font-bold text-white/90 text-sm flex items-center justify-center p-3 player",
        number === 1 && "bg-blue-500",
        number === 2 && "bg-red-500",
        number === 3 && "bg-green-500",
        number === 4 && "bg-yellow-500",
        bounce && "animate-bounce"
      )}
      id={`player-${number}`}
    >
      {number}
    </span>
  );
};

const Tile = ({
  number,
  players,
  to,
}: {
  number: number;
  players: { name: string; position: number; number: number }[];
  to: number;
}) => {
  return (
    <div
      className={cn(
        "aspect-square tile relative flex flex-col h-full justify-between",
        `tile-${number}`
      )}
    >
      <span className="self-start text-orange-900/90 font-semibold ml-1 text-xl">
        {number}
      </span>
      <div className="absolute w-full h-full z-[150] flex items-center justify-center gap-1">
        {players.map((player) => (
          <Player
            key={number}
            number={player.number}
            position={player.position}
            name={player.name}
            bounce={true}
          />
        ))}
      </div>
      {Data.find((data) => data.tile === number) && (
        <span className="self-end text-black/60 mr-1 text-sm">
          {Data.find((data) => data.tile === number)?.element}
        </span>
      )}
    </div>
  );
};

const Board = ({
  players,
  turn,
  lastRoll,
}: {
  players: { name: string; position: number; number: number }[];
  turn: number;
  lastRoll: number;
}) => {
  let tileNumber = 1;
  let tiles = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      tiles.push(
        <Tile
          key={tileNumber}
          number={tileNumber}
          players={players.filter((player) => player.position === tileNumber)}
          to={
            Ladders.find((ladder) => ladder.from === tileNumber)?.to ||
            Snakes.find((snake) => snake.from === tileNumber)?.to ||
            tileNumber
          }
        />
      );
      tileNumber++;
    }
  }

  return (
    <div className="grid grid-cols-10 grid-rows-10 max-w-[45rem] relative board">
      {tiles}
      <div className="absolute opacity-30 w-full h-full z-[100]">
        {Snakes.map((snake) => (
          <Snake key={snake.from} from={snake.from} to={snake.to} />
        ))}
        {Ladders.map((ladder) => (
          <Ladder key={ladder.from} from={ladder.from} to={ladder.to} />
        ))}
      </div>
    </div>
  );
};

const Dice = () => {
  return (
    <div id="platform">
      <div id="dice1" className="dice">
        <div className="side front">
          <div className="dot center"></div>
        </div>
        <div className="side front inner"></div>
        <div className="side top">
          <div className="dot dtop dleft"></div>
          <div className="dot dbottom dright"></div>
        </div>
        <div className="side top inner"></div>
        <div className="side right">
          <div className="dot dtop dleft"></div>
          <div className="dot center"></div>
          <div className="dot dbottom dright"></div>
        </div>
        <div className="side right inner"></div>
        <div className="side left">
          <div className="dot dtop dleft"></div>
          <div className="dot dtop dright"></div>
          <div className="dot dbottom dleft"></div>
          <div className="dot dbottom dright"></div>
        </div>
        <div className="side left inner"></div>
        <div className="side bottom">
          <div className="dot center"></div>
          <div className="dot dtop dleft"></div>
          <div className="dot dtop dright"></div>
          <div className="dot dbottom dleft"></div>
          <div className="dot dbottom dright"></div>
        </div>
        <div className="side bottom inner"></div>
        <div className="side back">
          <div className="dot dtop dleft"></div>
          <div className="dot dtop dright"></div>
          <div className="dot dbottom dleft"></div>
          <div className="dot dbottom dright"></div>
          <div className="dot center dleft"></div>
          <div className="dot center dright"></div>
        </div>
        <div className="side back inner"></div>
        <div className="side cover x"></div>
        <div className="side cover y"></div>
        <div className="side cover z"></div>
      </div>
    </div>
  );
};

const Game = () => {
  const [game, setGame] = useState<{
    gameStarted: boolean;
    playerCount: number;
    players: { name: string; position: number; number: number }[];
    playerTurn: number;
    lastRoll: number;
    end: boolean;
    playersSteps: { player: number; tiles: number[] }[];
    generatedPage: string | null;
  }>({
    gameStarted: false,
    playerCount: 1,
    players: [],
    playerTurn: 1,
    lastRoll: 0,
    end: false,
    playersSteps: [],
    generatedPage: null,
  });

  const startGame = (playerCount: number) => {
    let players = [];
    for (let i = 1; i <= playerCount; i++) {
      players.push({ name: `Player ${i}`, position: 1, number: i });
    }
    setGame({
      gameStarted: true,
      playerCount: playerCount,
      players: players,
      playerTurn: 1,
      lastRoll: 0,
      end: false,
      playersSteps: [],
      generatedPage: null,
    });
  };

  const rollDice = () => {
    let audio = new Audio("/assets/dice.mp3");
    audio.play();
    const platform = document.getElementById("platform") as HTMLElement;
    const dice = document.getElementById("dice1") as HTMLElement;

    platform.classList.remove("stop");
    platform.classList.add("playing");

    setTimeout(() => {
      platform.classList.remove("playing");
      platform.classList.add("stop");

      const roll = Math.floor(Math.random() * 6) + 1;
      let players = game.players.slice();

      let x = 0;
      let y = 20;
      let z = -20;

      switch (roll) {
        case 1:
          x = 10;
          y = 10;
          z = 20;
          break;
        case 2:
          x = -80;
          y = -150;
          z = 10;
          break;
        case 3:
          x = 0;
          y = -100;
          z = -10;
          break;
        case 4:
          x = 0;
          y = 100;
          z = 10;
          break;
        case 5:
          x = 80;
          y = 120;
          z = 20;
          break;
        case 6:
          x = 10;
          y = 190;
          z = -10;
          break;
      }

      dice.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;

      let nextTurn = game.playerTurn + 1;
      if (nextTurn > game.playerCount) {
        nextTurn = 1;
      }

      if (game.players[game.playerTurn - 1].position + roll <= 100) {
        players[game.playerTurn - 1].position += roll;
      } else {
        nextTurn = game.playerTurn;
      }

      for (let ladder of Ladders) {
        if (players[game.playerTurn - 1].position === ladder.from) {
          players[game.playerTurn - 1].position = ladder.to;
        }
      }

      for (let snake of Snakes) {
        if (players[game.playerTurn - 1].position === snake.from) {
          players[game.playerTurn - 1].position = snake.to;
        }
      }

      setGame({
        gameStarted: game.gameStarted,
        playerCount: game.playerCount,
        players: players,
        playerTurn: nextTurn,
        lastRoll: roll,
        end: players[game.playerTurn - 1].position === 100,
        playersSteps: [
          ...game.playersSteps,
          {
            player: game.playerTurn,
            tiles: [game.players[game.playerTurn - 1].position],
          },
        ],
        generatedPage: null,
      });
    }, 1000);
  };
  return (
    <div>
      {!game.gameStarted && (
        <div className="flex flex-col items-center gap-10">
          <label htmlFor="playerCount" className="text-3xl">
            Number of players
          </label>
          <input
            type="number"
            value={game.playerCount}
            onChange={(e) => {
              setGame({
                gameStarted: game.gameStarted,
                playerCount: parseInt(e.target.value),
                players: game.players,
                playerTurn: game.playerTurn,
                lastRoll: game.lastRoll,
                end: game.end,
                playersSteps: game.playersSteps,
                generatedPage: game.generatedPage,
              });
            }}
            className="w-1/2 h-20 text-3xl rounded-md border-2 border-gray-600 text-center"
            max={2}
            min={1}
          />
          <Button
            onClick={() => startGame(game.playerCount)}
            className="w-1/2 text-3xl py-10"
          >
            Start Game
          </Button>
        </div>
      )}
      {game.gameStarted && !game.end && (
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <Board
              players={game.players}
              turn={game.playerTurn}
              lastRoll={game.lastRoll}
            />
            <div className="flex items-center gap-4 py-4">
              {game.players.map((player) => (
                <div
                  key={player.number}
                  className={cn(
                    "flex gap-2 items-center transition-all duration-300 ease-in-out",
                    game.playerTurn === player.number && !game.end
                      ? "border-2 border-orange-900/60 p-2 rounded-lg"
                      : "",
                    game.end &&
                      player.position === 100 &&
                      "border-2 border-orange-900/60 p-2 rounded-lg bg-yellow-200/60"
                  )}
                >
                  <Player
                    number={player.number}
                    position={player.position}
                    name={player.name}
                    bounce={false}
                  />
                  <span>{player.name}</span>
                  <span>{player.position === 100 && "🏆"}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 flex flex-col justify-between max-h-screen">
            <div className="grid grid-cols-2 gap-2">
              {game.players.map((player) => {
                return (
                  <div className="col-span-1" key={player.number}>
                    <h3 className="flex items-center gap-2 pb-2">
                      <Player
                        number={player.number}
                        position={player.position}
                        name={player.name}
                        bounce={false}
                      />
                      {player.name}
                    </h3>
                    <ScrollArea className="h-72 w-full py-1 px-3 rounded-md border">
                      {game.playersSteps.map((steps, i) => {
                        if (steps.player === player.number) {
                          return (
                            <div key={i}>
                              {steps.tiles.map((tile, i) => {
                                return (
                                  <span
                                    key={i}
                                    className="flex items-center gap-2"
                                  >
                                    {tile}
                                    {Data.find(
                                      (data) => data.tile === tile
                                    ) && (
                                      <>
                                        <ChevronRight className="w-3 h-3 text-slate-700" />
                                        {
                                          Data.find(
                                            (data) => data.tile === tile
                                          )?.element
                                        }
                                      </>
                                    )}
                                  </span>
                                );
                              })}
                            </div>
                          );
                        }
                      })}
                    </ScrollArea>
                  </div>
                );
              })}
              <div className="col-span-2 relative overflow-hidden">
                <div className="border rounded-lg p-2">
                  <span className="text-lg">
                    {
                      Data.find(
                        (data) =>
                          data.tile ===
                          game.players[
                            game.playerTurn === 1
                              ? game.players.length - 1
                              : game.playerTurn - 2
                          ].position
                      )?.details
                    }
                  </span>
                </div>
                <BadgeInfo className="absolute -bottom-4 -right-6 text-slate-400/20 w-20 h-20" />
              </div>
            </div>
            <button onClick={rollDice} disabled={game.end}>
              <Dice />
            </button>
          </div>
        </div>
      )}
      {game.end && !game.generatedPage && (
        <div className="flex flex-col items-center gap-20">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[15rem]">🏆</h1>
            <h2 className="text-2xl">
              {game.players[game.playerTurn - 1].name} wins!
            </h2>
            <ScrollArea className="h-72 w-60 py-1 px-3 rounded-md border">
              {game.playersSteps.map((steps, i) => {
                if (
                  steps.player ===
                  game.players.find((player) => player.position === 100)?.number
                ) {
                  return (
                    <div key={i}>
                      {steps.tiles.map((tile, i) => {
                        return (
                          <span key={i} className="flex items-center gap-2">
                            {tile}
                            {Data.find((data) => data.tile === tile) && (
                              <>
                                <ChevronRight className="w-3 h-3 text-slate-700" />
                                {
                                  Data.find((data) => data.tile === tile)
                                    ?.element
                                }
                              </>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  );
                }
              })}
            </ScrollArea>
          </div>
          <Button
            onClick={() => {
              setGame({
                gameStarted: false,
                playerCount: 1,
                players: [],
                playerTurn: 1,
                lastRoll: 0,
                end: false,
                playersSteps: [],
                generatedPage: null,
              });
            }}
            className="w-1/2 text-3xl py-10"
          >
            Restart Game
          </Button>
          <Button
            onClick={() => {
              const winner = game.players.find(
                (player) => player.position === 100
              );
              const elements = game.playersSteps.filter(
                (steps) => steps.player === winner?.number
              );
              const arrayOfTiles = elements.map((element) => element.tiles);
              const tiles = arrayOfTiles.flat();
              const data = tiles.map((tile) => {
                return Data.find((data) => data.tile === tile)?.element;
              });
              generatePage(data as string[]).then((page) => {
                setGame({
                  gameStarted: game.gameStarted,
                  playerCount: game.playerCount,
                  players: game.players,
                  playerTurn: game.playerTurn,
                  lastRoll: game.lastRoll,
                  end: game.end,
                  playersSteps: game.playersSteps,
                  generatedPage: page,
                });
              });
            }}
            className="w-1/2 text-3xl py-10"
            variant={"outline"}
          >
            Generate Page
          </Button>
        </div>
      )}
      {game.end && game.generatedPage && (
        <div className="flex flex-col items-center gap-10">
          <h1 className="text-3xl">Generated Page</h1>
          <iframe srcDoc={game.generatedPage} className="w-3/4 h-96 border rounded-md p-2"></iframe>
        </div>
      )}
    </div>
  );
};

export default Game;

const generatePage = async (elements: string[]) => {
  const apiKey: string = "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";
  const prompt: string = `Create a simple HTML layout using the provided array of HTML tags.Ensure that the elements are logically organized and provide a basic structure for a webpage. You can also specify any additional instructions or details you want to include in the HTML layout. Please make the output cohesive and well-structured. The layout may include the following tags: ${elements.join(
    ", "
  )}`;
  const apiUrl: string = "https://api.openai.com/v1/completions";
  try {
    const response = await axios.post(
      apiUrl,
      {
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0,
        model: "gpt-3.5-turbo-instruct",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data.choices[0].text;
  } catch (err) {
    console.error(err);
  }
};
