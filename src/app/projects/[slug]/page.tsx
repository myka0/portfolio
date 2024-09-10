import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CustomMDX } from "@/app/components/mdx";
import {
  Heading,
  Flex,
  Background,
  InlineCode,
  Icon,
  Tag,
} from "@/once-ui/components";
import TableOfContents from "@/app/projects/components/TableOfContents";
import Link from "next/link";

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function generateStaticParams() {
  const files = fs.readdirSync(CONTENT_DIR);

  return files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return {
      notFound: true,
    };
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(rawContent);

  const StatusBadge = ({ status }) => {
    if (status === "Completed") {
      return <Tag variant="success" size="l" label={status}></Tag>;
    } else {
      return <Tag variant="warning" size="l" label={status}></Tag>;
    }
  };

  return (
    <Flex
      fillWidth
      paddingTop="l"
      paddingX="l"
      direction="column"
      alignItems="center"
      flex={1}
    >
      <Background dots={true} lines={false} />

      <Flex
        as="section"
        position="relative"
        direction="column"
        alignItems="center"
        fillWidth
        maxWidth={32}
        paddingY="l"
        gap="l"
      >
        <Flex as="article" direction="column" gap="16" fillWidth>
          <Heading variant="display-strong-l">{frontmatter.title}</Heading>

          <Flex alignItems="center" gap="m">
            <InlineCode
              className="shadow-m"
              style={{
                width: "fit-content",
                padding: "var(--static-space-8) var(--static-space-16)",
              }}
            >
              {frontmatter.techStack.join(" | ")}
            </InlineCode>
          </Flex>

          <Flex alignItems="center" gap="m" marginX="8">
            <StatusBadge status={frontmatter.status} />
            <Link href={frontmatter.github} target="_blank">
              <Icon name="github" size="l" />
            </Link>
          </Flex>

          <CustomMDX source={content} />
        </Flex>
        <TableOfContents structure={frontmatter.headings} />
      </Flex>
    </Flex>
  );
}
