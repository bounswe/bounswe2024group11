import { Modal, TextInput, Textarea } from "@mantine/core";
import { Form } from "react-router-dom";
import { button, buttonInnerRing } from "./Button";
import { RiAddFill, RiQuillPenLine } from "@remixicon/react";
import { useDisclosure } from "@mantine/hooks";

export const NewPost = ({ initial = false }: { initial?: boolean }) => {
	const [opened, { open, close }] = useDisclosure(false);
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
			<Modal.Root opened={opened} onClose={close}>
				<Modal.Overlay />
				<Modal.Content>
					<Modal.Header className="w-full flex flex-col p-0">
						<div className="w-full flex flex-row gap-3 justify-between items-center p-4">
							<button
								type="button"
								className="rounded-full w-12 h-11 border-slate-200 border flex justify-center items-center"
							>
								<RiQuillPenLine className="text-slate-700" size={24} />
							</button>
							<div className="flex flex-col w-full justify-between items-stretch gap-1">
								<div className="flex flex-row items-center w-full justify-between">
									<Modal.Title className="text-slate-900 text-lg">
										New Post
									</Modal.Title>
									<Modal.CloseButton />
								</div>
								<h2 className="text-slate-500 text-sm">
									Let's see your art! Create a new post!{" "}
								</h2>
							</div>
						</div>
						<hr className="h-1 w-full" />
					</Modal.Header>
					<Modal.Body className="px-5 py-6">
						<Form
							className="w-full flex flex-col gap-4 justify-between items-end"
							method="POST"
							action="/profile"
						>
							<TextInput
								label="Url of the picture"
								classNames={{
									label: "text-slate-900 text-lg",
									input: "border-1 rounded-3 w-full text-slate-700",
									wrapper: "w-full",
									root: "w-full",
								}}
								type="text"
								name="picurl"
								aria-label="picture url"
								aria-errormessage="Invalid password"
							/>
							<TextInput
								label="Title"
								classNames={{
									label: "text-slate-900 text-lg",
									input: "border-1 rounded-3 w-full text-slate-700",
									wrapper: "w-full",
									root: "w-full",
								}}
								type="text"
								name="title"
								aria-label="title"
								aria-errormessage="Invalid password"
							/>
							<Textarea
								className="w-full rounded-3 border-1"
								placeholder="..."
							/>
							<button type="submit" className={button({ intent: "secondary" })}>
								Post
							</button>
						</Form>
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>
		</>
	);
};
