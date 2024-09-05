"use client";

import React from 'react';

import { Heading, Text, Flex, Button, Grid, Icon, InlineCode, Logo, Background } from '@/once-ui/components';
import Link from 'next/link';

export default function Home() {
	const links = [
		{
			href: "/projects/umbra-writer",
			title: "Umbra Writer",
			description: "Real-time web-based rich text editor.",
		},
		{
			href: "/projects/wetpaint",
			title: "Wetpaint Lang",
			description: "Dynamically typed and interpreted language written in C++.",
		},
		{
			href: "resume",
			title: "Resume",
			description: "My professional background and experience overview.",
		},
	];

	return (
		<Flex
			fillWidth paddingTop="l" paddingX="l"
			direction="column" alignItems="center" flex={1}>
			<Background
				dots={true} lines={false}/>
			<Flex
				position="relative"
				as="section" overflow="hidden"
				fillWidth minHeight="0" maxWidth={64}
				direction="column" alignItems="center" flex={1}>
				<Flex
					as="main"
					direction="column" justifyContent="center"
					fillWidth fillHeight padding="l" gap="l">
					<Flex
						mobileDirection="row"
						fillWidth gap="24">
						<Flex
							position="relative"
							fillWidth paddingTop="0" paddingX="xl"
              style={{ top: '-8px' }}>
							<Logo size="xl" icon={false} style={{zIndex: '1'}}/>
						</Flex>
						<Flex
							position="relative"
							fillWidth gap="24" marginBottom="104"
							direction="column">
							<Heading
								variant="display-strong-s">
								Hi I'm<br/>Myka Mayer
							</Heading>
							<InlineCode
								className="shadow-m"
								style={{
									width: 'fit-content',
									padding: 'var(--static-space-8) var(--static-space-16)',
									backdropFilter: 'blur(var(--static-space-1))'}}>
								Software Engineer | <span className="brand-on-background-weak">Front End</span> | Web App Developer
							</InlineCode>
							<Button
								href="/projects"
								suffixIcon="chevronRight"
								variant="secondary">
							  Projects
							</Button>
						</Flex>
					</Flex>
					<Grid
						radius="l"
						border="neutral-medium"
						borderStyle="solid-1"
						columns="repeat(3, 1fr)"
						tabletColumns="1col"
						mobileColumns="1col"
						fillWidth>
						{links.map((link) => (
							<Link
								target="_blank"
								style={{ padding: 'var(--responsive-space-l)' }}
								key={link.href}
								href={link.href}>
								<Flex
									fillWidth paddingY="8" gap="8"
									direction="column">
									<Flex
										fillWidth gap="12"
										alignItems="center">
										<Text
											variant="body-strong-m" onBackground="neutral-strong">
											{link.title}
										</Text>
										<Icon size="s" name="arrowUpRight" />
									</Flex>
									<Text
										variant="body-default-s" onBackground="neutral-weak">
										{link.description}
									</Text>
								</Flex>
							</Link>
						))}
					</Grid>
				</Flex>
			</Flex>
			<Flex
				as="footer"
				position="relative"
				fillWidth paddingX="l" paddingY="m"
				justifyContent="right">
				<Flex
					gap="12">
					<Button
						href="https://github.com/myka0"
						prefixIcon="github" size="s" variant="tertiary">
						GitHub
					</Button>
					<Button
						href="mailto:mykamayer@gmail.com"
						prefixIcon="person" size="s" variant="tertiary">
						mykamayer0@gmail.com
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
}
