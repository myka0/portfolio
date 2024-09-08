import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CustomMDX } from "@/app/components/mdx";
import { Heading, Flex, Background, InlineCode } from "@/once-ui/components";
import TableOfContents from "@/app/projects/components/TableOfContents";

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
        <Flex as="article" direction="column" fillWidth>
          <Heading marginBottom="16" variant="display-strong-l">
            {frontmatter.title}
          </Heading>
          <InlineCode
            className="shadow-m"
            style={{
              width: "fit-content",
              padding: "var(--static-space-8) var(--static-space-16)",
            }}
          >
            {frontmatter.techStack.join(" | ")}
          </InlineCode>
          <CustomMDX source={content} />
        </Flex>
        <TableOfContents structure={frontmatter.headings} />
      </Flex>
    </Flex>
  );
}
