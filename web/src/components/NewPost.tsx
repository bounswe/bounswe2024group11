import { Modal, TextInput, Textarea } from "@mantine/core";
import { Form, useFetcher } from "react-router-dom";
import { button, buttonInnerRing } from "./Button";
import { RiAddFill, RiQuillPenLine } from "@remixicon/react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

export const NewPost = ({ initial = false }: { initial?: boolean }) => {
	const newPostFetcher = useFetcher();
	const [opened, { open, close }] = useDisclosure(false);
	const isMobile = useMediaQuery("(max-width: 50em)");
	return (
		<>
			<aside className="fixed bottom-8 right-12">
				<button
					type="button"
					className={button({
						intent: "secondary",
						icon: "left",
					})}
					onClick={open}
				>
					<RiAddFill size={20} />
					<span className={buttonInnerRing({ intent: "secondary" })} />
					New Post
				</button>
			</aside>
			<Modal.Root
				opened={opened}
				onClose={close}
				fullScreen={isMobile}
				yOffset={"8rem"}
			>
				<Modal.Overlay />
				<Modal.Content>
					<Modal.Header className="w-full flex flex-col p-0">
						<div className="w-full flex flex-row gap-3 justify-between items-center p-4">
							<div className="rounded-full w-12 p-2 h-12 border-slate-200 border flex justify-center items-center">
								<RiQuillPenLine className="text-slate-700" size={24} />
							</div>
							<div className="flex flex-col w-full justify-between items-stretch">
								<div className="flex flex-row items-center w-full justify-between">
									<Modal.Title className="text-slate-900 font-medium text-lg">
										New Post
									</Modal.Title>
									<Modal.CloseButton />
								</div>
								<h2 className="text-slate-500 text-sm">
									Let's see your art! Create a new post!
								</h2>
							</div>
						</div>
						<hr className="h-1 w-full" />
					</Modal.Header>
					<Modal.Body className="px-5 py-6">
						<newPostFetcher.Form
							onSubmit={close}
							className="w-full flex flex-col gap-4 justify-between items-stretch"
							method="POST"
							action="/new_post"
						>
							<TextInput
								required
								label="Title"
								classNames={{
									label: "text-slate-900 text-base font-medium mb-1",
								}}
								type="text"
								name="title"
								aria-label="title"
								aria-errormessage="Invalid password"
								placeholder="The best Marvel movie is..."
							/>
							<Textarea
								label="Message"
								classNames={{
									label: "text-slate-900 text-base font-medium mb-1",
								}}
								required
								className="w-full border-1 h-24"
								placeholder="Let me put you on to some knowledge..."
							/>
							<TextInput
								label="Image URL"
								placeholder="https://i.ibb.co/c1fGmZZ/post-image.png"
								classNames={{
									label: "text-slate-900 text-base font-medium mb-1",
								}}
								type="text"
								name="picurl"
								aria-label="image url"
								aria-errormessage="Invalid password"
							/>
							<button type="submit" className={button({ intent: "secondary" })}>
								<span className={buttonInnerRing({ intent: "secondary" })} />
								Post
							</button>
						</newPostFetcher.Form>
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>
		</>
	);
};
