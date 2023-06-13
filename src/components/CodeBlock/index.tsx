import React, { useState, useEffect } from 'react';
import CB from '@theme/CodeBlock';

interface Props {
  url: string;
  snippet_name: string;
}

export default function CodeBlock(props: Props): JSX.Element {

  const [code, setCode] = useState("code");
  const [link, setLink] = useState("link");

  useEffect(() => {
    const fetchData = async () => {
      const test = await fetch(props.url.replace("github.com","raw.githubusercontent.com").replace("/blob",""));
      const result = await test.text();
      const lines = result.trim().split('\n');
      let start=0;
      let end=0;
      lines.forEach((line, index) => {
        console.log(line);
        if (line.includes(`SNIPPET ${props.snippet_name} START`)) {
          start = index+1;
        }
        if (line.includes(`SNIPPET ${props.snippet_name} END`)) {
          end = index;
        }
      });
      // If the snippet markers cant be matched in the file, just show the whole file
      if(start===0 && end===0) {
        setCode(lines.join('\n'));
        setLink(props.url);
        
      } else{
        setCode(lines.slice(start,end).join('\n'));
        setLink(props.url+`#L${start}-L${end+1}`);
      }
      
    };
    fetchData();
  });

  return (
    <CB showLineNumbers={false} title={<a href={link}>{link}</a>} language={"python"}>{code}</CB>
  );
}
