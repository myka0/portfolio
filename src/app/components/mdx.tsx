import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import { CSSProperties } from "react";

import {
  Flex,
  Heading,
  SmartImage,
  SmartLink,
  InlineCode,
  Text,
} from "@/once-ui/components";

import { TextProps } from "@/once-ui/interfaces";
import { SmartImageProps } from "@/once-ui/components/SmartImage";

import PrismLoader from "@/app/components/prism-loader";

type TableProps = {
  data: {
    headers: string[];
    rows: string[][];
  };
};

function Table({ data }: TableProps) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props} style={{ display: "block" }}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({
  alt,
  src,
  ...props
}: SmartImageProps & { src: string }) {
  if (!src) {
    console.error("SmartImage requires a valid 'src' property.");
    return null;
  }

  return (
    <SmartImage
      className="my-20"
      enlarge
      radius="m"
      aspectRatio="7/6"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

function createHeading(
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  size:
    | "display-strong-m"
    | "display-strong-s"
    | "heading-strong-xl"
    | "heading-strong-l"
    | "heading-strong-m",
) {
  const CustomHeading = ({ children }: TextProps) => {
    return (
      <Heading
        id={children?.toString()}
        variant={size}
        style={{
          marginTop: "var(--static-space-12)",
        }}
        as={level}
      >
        {children}
      </Heading>
    );
  };

  CustomHeading.displayName = `Heading${level}`;

  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: "150%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

function createList({ children }: { children: ReactNode }) {
  return (
    <Text
      as="ul"
      style={{
        listStyleType: "disc",
        lineHeight: "150%",
        textIndent: "-14px",
        paddingInlineStart: "32px",
      }}
    >
      {children}
    </Text>
  );
}

function createOrderedList({ children }: { children: ReactNode }) {
  return (
    <Text
      as="ol"
      style={{
        listStyleType: "disc",
        lineHeight: "150%",
        textIndent: "-14px",
        paddingInlineStart: "32px",
      }}
    >
      {children}
    </Text>
  );
}

const codeStyle: CSSProperties = {
  backgroundColor: "var(--function-neutral-200)",
  padding: "3px 6px",
  borderRadius: "4px",
  fontFamily: '"Source Code Pro", monospace',
  fontSize: "90%",
};

function createInlineCode({ children }: { children: ReactNode }) {
  return <code style={codeStyle}>{children}</code>;
}

const codeBlockStyle: CSSProperties = {
  backgroundColor: "var(--function-neutral-200)",
  border: "1px solid var(--function-neutral-300)",
  padding: "16px",
  borderRadius: "16px",
  fontFamily: '"Source Code Pro", monospace',
  lineHeight: "150%",
  overflowX: "auto",
  textIndent: "-4px",
};

function createCodeBlock({ children }: { children: ReactNode }) {
  return (
    <div>
      <pre className="language-sh" style={codeBlockStyle}>
        {children}
      </pre>
      <PrismLoader />
    </div>
  );
}

const components = {
  p: createParagraph as any,
  h1: createHeading("h1", "display-strong-m") as any,
  h2: createHeading("h2", "display-strong-s") as any,
  h3: createHeading("h3", "heading-strong-xl") as any,
  h4: createHeading("h4", "heading-strong-m") as any,
  h5: createHeading("h5", "heading-strong-m") as any,
  h6: createHeading("h6", "heading-strong-m") as any,
  img: createImage as any,
  a: CustomLink as any,
  ul: createList as any,
  ol: createOrderedList as any,
  code: createInlineCode as any,
  pre: createCodeBlock as any,
  Table,

  li: ({ children }: { children: ReactNode }) => (
    <li style={{ marginBottom: "10px" }}>{children}</li>
  ),
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps, imgApectRatio: string) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
