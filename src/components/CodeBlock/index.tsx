import React, { useState, useEffect } from 'react';
import CB from '@theme/CodeBlock';

interface Props {
  url: string;
  lines: number[];
}

export default function CodeBlock(props: Props): JSX.Element {

  const [code, setCode] = useState("wert");
  const [link, setLink] = useState("wert");

  useEffect(() => {
    const fetchData = async () => {
      const test = await fetch(props.url.replace("github.com","raw.githubusercontent.com").replace("/blob",""));
      const result = await test.text();
      const lines = result.trim().split('\n');
      console.log(lines);
      setCode(lines.slice(props.lines[0]-1,props.lines[1]).join('\n'));
      setLink(props.url+`#L${props.lines[0]}-L${props.lines[1]}`);
    };
    fetchData();
  });

  return (
    <CB showLineNumbers={false} title={<a href={link}>{link}</a>} language={"python"}>{code}</CB>
  );
}
