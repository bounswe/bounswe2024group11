import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { useState } from "react";
import { useFetcher } from "react-router-dom";
import { UnBlockAction } from "../routes/Profile/Profile.data";
import { Blockings } from "../routes/Profile/Profile.schema";
import { Avatar } from "./avatar";
import { buttonClass, buttonInnerRing } from "./button";

const INITIAL_DISPLAY_COUNT = 6;
const LOAD_MORE_COUNT = 6;

export const BlockingModal = ({ blockings }: { blockings: Blockings[] }) => {
    const unblockFetcher = useFetcher<typeof UnBlockAction>();
    const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);

    const blockedUsers = blockings.slice(0, displayCount);
    const hasMore = displayCount < blockings.length;
    const [open, setOpen] = useState(false);
    if (!blockings.length) return null;
    return (
        <section aria-label="Blocked Users" className="flex flex-col gap-4">
            <Button
                onClick={() => setOpen(true)}
                className={buttonClass({ intent: "tertiary", size: "medium" })}
            >
                <span className={buttonInnerRing({ intent: "tertiary" })} />
                See blocked users ({blockedUsers.length})
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100dvh-var(--inset)*2)] flex-col gap-4 overflow-auto rounded-1 bg-white p-4 text-slate-800 shadow-xl sm:bottom-[10vh] sm:top-[10vh] sm:mt-0 sm:max-h-[80vh] sm:w-[480px] sm:rounded-[1rem] sm:p-6"
            >
                <DialogHeading className="text-xs font-medium uppercase text-slate-500">
                    Blocked Users
                </DialogHeading>
                <div className="flex w-full flex-col items-center gap-4">
                    {blockedUsers.length > 0
                        ? blockedUsers.map((user) => (
                              <div className="flex w-full items-center gap-4 rounded-1 bg-white p-4 ring ring-slate-200 transition-colors hover:bg-slate-100">
                                  <div className="flex flex-1 flex-row items-center gap-4">
                                      <Avatar
                                          author={{
                                              full_name: user.full_name,
                                              username: user.username,
                                              avatar: user.avatar,
                                          }}
                                          size={40}
                                      />
                                      <div className="flex w-full max-w-48 flex-col items-start">
                                          <span className="font-medium text-slate-900">
                                              {user.full_name}
                                          </span>
                                          <p className="text-sm text-slate-500">
                                              @{user.username}
                                          </p>
                                      </div>
                                  </div>
                                  <unblockFetcher.Form
                                      method="POST"
                                      action={`unblock/`}
                                  >
                                      <Button
                                          className={buttonClass({
                                              intent: "tertiary",
                                              size: "medium",
                                          })}
                                          type="submit"
                                      >
                                          <span
                                              className={buttonInnerRing({
                                                  intent: "tertiary",
                                              })}
                                          />
                                          <span>Unblock</span>
                                      </Button>
                                      <input
                                          type="hidden"
                                          name="blocking"
                                          value={user.is_blocked || -1}
                                      ></input>
                                  </unblockFetcher.Form>
                              </div>
                          ))
                        : "No blocked users"}
                </div>
                {hasMore && (
                    <div className="mt-4 flex justify-center">
                        <Button
                            onClick={() =>
                                setDisplayCount(
                                    (prev) => prev + LOAD_MORE_COUNT,
                                )
                            }
                            className={buttonClass({
                                intent: "primary",
                                size: "medium",
                            })}
                        >
                            Load More
                        </Button>
                    </div>
                )}
                <div className="flex flex-row justify-end">
                    <DialogDismiss
                        className={buttonClass({
                            intent: "destructive",
                            size: "medium",
                        })}
                    >
                        Close
                    </DialogDismiss>
                </div>
            </Dialog>
        </section>
    );
};
