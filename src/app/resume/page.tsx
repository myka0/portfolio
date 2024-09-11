import {
  Avatar,
  Background,
  Button,
  Flex,
  Heading,
  Icon,
  InlineCode,
  IconButton,
  Grid,
  SmartImage,
  Tag,
  Text,
} from "@/once-ui/components";
import TableOfContents from "@/app/components/TableOfContents";
import styles from "@/app/resume/resume.module.scss";
import Link from "next/link";
import resumeData from "@/app/resume/resume.json";

export function generateMetadata() {
  const { title, description } = resumeData.about;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://mykamayer.com/resume`,
    },
  };
}

export default function Resume() {
  interface StatusBadgeProps {
    status: string;
  }

  const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    if (status === "Completed") {
      return <Tag variant="success" size="l" label={status}></Tag>;
    } else {
      return <Tag variant="warning" size="l" label={status}></Tag>;
    }
  };

  const { about, social } = resumeData;

  type StructureItem = string | { [key: string]: string[] };

  const structure: StructureItem[] = [
    "Introduction",
    { Education: ["University of Oklahoma"] },
    { "Personal Projects": ["Umbra Writer", "Wetpaint"] },
    {
      "Technical Skills": [
        "Languages",
        "Web Technologies",
        "Databases & ORMs",
        "Tools",
      ],
    },
  ];

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
      <Flex fillWidth maxWidth="m" direction="column">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Myka Mayer",
              jobTitle: "Software Engineer",
              description: about.intro.description,
            }),
          }}
        />

        <Flex
          position="fixed"
          paddingLeft="24"
          gap="32"
          direction="column"
          hide="s"
        >
          <TableOfContents structure={structure} />
        </Flex>

        <Flex
          as="section"
          position="relative"
          direction="column"
          alignItems="center"
          fillWidth
          paddingY="l"
          gap="l"
        >
          <Flex
            className={styles.blockAlign}
            fillWidth
            flex={9}
            maxWidth={40}
            direction="column"
          >
            <Flex
              id={about.intro.title}
              fillWidth
              minHeight="160"
              direction="column"
              justifyContent="center"
              marginBottom="32"
            >
              <Heading className={styles.textAlign} variant="display-strong-xl">
                Myka Mayer
              </Heading>
              <Text
                className={styles.textAlign}
                variant="display-default-xs"
                marginBottom="8"
                onBackground="neutral-weak"
              >
                Software Engineer
              </Text>

              <Flex
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                  border: "1px solid var(--brand-alpha-medium)",
                  width: "fit-content",
                }}
                alpha="brand-weak"
                radius="full"
                fillWidth
                padding="4"
                gap="8"
                alignItems="center"
              >
                <Flex paddingLeft="12">
                  <Icon name="calendar" onBackground="brand-weak" />
                </Flex>
                <Flex paddingX="8">Schedule a call</Flex>
                <IconButton
                  href="https://cal.com/myka0"
                  data-border="rounded"
                  variant="tertiary"
                  icon="chevronRight"
                />
              </Flex>

              <Flex className={styles.blockAlign} paddingTop="12" gap="8" wrap>
                {social.map(
                  (item) =>
                    item.link && (
                      <Button
                        key={item.name}
                        href={item.link}
                        prefixIcon={item.icon}
                        label={item.name}
                        size="s"
                        variant="tertiary"
                      />
                    ),
                )}
              </Flex>
            </Flex>

            <Flex
              direction="column"
              textVariant="body-default-l"
              fillWidth
              gap="m"
              marginBottom="l"
            >
              {about.intro.description}
            </Flex>

            <Heading
              as="h2"
              id={about.studies.title}
              variant="display-strong-s"
              marginBottom="m"
            >
              {about.studies.title}
            </Heading>
            <Flex direction="column" fillWidth gap="l" marginBottom="40">
              {about.studies.institutions.map((institution, index) => (
                <Flex
                  key={`${institution.name}-${index}`}
                  fillWidth
                  gap="4"
                  direction="column"
                >
                  <Flex
                    fillWidth
                    justifyContent="space-between"
                    alignItems="flex-end"
                  >
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text
                      variant="heading-default-xs"
                      onBackground="neutral-weak"
                    >
                      {institution.graduation}
                    </Text>
                  </Flex>
                  <Text
                    variant="body-default-m"
                    onBackground="brand-weak"
                    marginBottom="8"
                  >
                    {institution.description}
                  </Text>
                  <Flex
                    as="ul"
                    direction="column"
                    gap="8"
                    marginBottom="16"
                    style={{ paddingInlineStart: "24px", textIndent: "-14px" }}
                  >
                    {institution.achievements.map((achievement, index) => (
                      <Text
                        as="li"
                        variant="body-default-m"
                        key={`${institution.name}-${index}`}
                      >
                        {achievement}
                      </Text>
                    ))}
                  </Flex>
                  <Text
                    variant="body-default-m"
                    onBackground="brand-weak"
                    marginBottom="8"
                  >
                    Relevant Coursework:
                  </Text>
                  <Flex
                    as="ul"
                    direction="column"
                    gap="8"
                    style={{ paddingInlineStart: "24px", textIndent: "-14px" }}
                  >
                    {institution.coursework.map((coursework, index) => (
                      <Text
                        as="li"
                        variant="body-default-m"
                        key={`${institution.name}-${index}`}
                      >
                        {coursework}
                      </Text>
                    ))}
                  </Flex>
                </Flex>
              ))}
            </Flex>

            <Heading
              as="h2"
              id={about.projects.title}
              variant="display-strong-s"
              marginBottom="m"
            >
              {about.projects.title}
            </Heading>
            <Flex direction="column" fillWidth gap="l" marginBottom="40">
              {about.projects.project.map((project, index) => (
                <Flex
                  key={`${project.title}-${project.description}-${index}`}
                  fillWidth
                  direction="column"
                >
                  <Flex marginBottom="16">
                    <Link href={project.href}>
                      <Flex
                        fillWidth
                        alignItems="center"
                        gap="8"
                        marginBottom="4"
                      >
                        <Text id={project.title} variant="heading-strong-l">
                          {project.title}
                        </Text>
                        <Icon size="s" name="arrowUpRight" />
                      </Flex>
                      <Text
                        variant="body-default-m"
                        onBackground="brand-weak"
                        marginBottom="8"
                      >
                        {project.description}
                      </Text>
                    </Link>
                  </Flex>

                  <Flex
                    alignItems="center"
                    gap="s"
                    justifyContent="space-between"
                    marginBottom="m"
                  >
                    <Flex alignItems="center" gap="s">
                      <InlineCode
                        className="shadow-m"
                        style={{
                          width: "fit-content",
                          padding:
                            "var(--static-space-8) var(--static-space-16)",
                        }}
                      >
                        {project.techStack.join(" | ")}
                      </InlineCode>
                      <Link href={project.github} target="_blank">
                        <Icon name="github" size="l" />
                      </Link>
                    </Flex>
                    <StatusBadge status={project.status} />
                  </Flex>

                  <Flex
                    as="ul"
                    direction="column"
                    gap="16"
                    style={{ paddingInlineStart: "24px", textIndent: "-14px" }}
                  >
                    {project.achievements.map((achievement, index) => (
                      <Text
                        as="li"
                        variant="body-default-m"
                        key={`${project.title}-${index}`}
                      >
                        {achievement}
                      </Text>
                    ))}
                  </Flex>
                </Flex>
              ))}
            </Flex>

            <Heading
              as="h2"
              id={about.technical.title}
              variant="display-strong-s"
              marginBottom="16"
            >
              {about.technical.title}
            </Heading>
            <Grid
              columns="repeat(2, 1fr)"
              tabletColumns="2col"
              mobileColumns="2col"
              gap="m"
              fillWidth
            >
              {about.technical.skills.map((skill, index) => (
                <Flex
                  key={`${skill}-${index}`}
                  direction="column"
                  gap="8"
                  padding="m"
                  border="neutral-medium"
                  borderStyle="solid-1"
                  radius="m"
                  style={{
                    backdropFilter: "blur(var(--static-space-1))",
                    border: "1px solid var(--brand-alpha-medium)",
                  }}
                  alpha="brand-weak"
                >
                  <Text id={skill.title} variant="heading-strong-l">
                    {skill.title}
                  </Text>
                  <Flex
                    as="ul"
                    direction="column"
                    gap="8"
                    style={{
                      paddingInlineStart: "32px",
                      textIndent: "-14px",
                    }}
                  >
                    {skill.skills.map((skills, index) => (
                      <Text
                        as="li"
                        variant="body-default-m"
                        key={`${skill.title}-${index}`}
                      >
                        {skills}
                      </Text>
                    ))}
                  </Flex>
                </Flex>
              ))}
            </Grid>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
