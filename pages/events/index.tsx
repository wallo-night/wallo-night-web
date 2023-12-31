import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { Input } from "antd";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { useAuth } from "@/components/util/context-user";
import { useEffect } from "react";
import { EmptyData } from "@/components/ui/empty-data";
import { ButtonInput } from "@/components/ui/button-input";
import { LoadingFile } from "@/components/ui/loading-file";
import { GetInfiniteEventsAPI } from "@/api-site/event";
import { ListEvents } from "@/components/event/list-events";
import { HorizontalNavEvent } from "@/components/event/horizontal-nav-event";

const Events = () => {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { userStorage } = useAuth() as any;

  const {
    isLoading: isLoadingEvent,
    isError: isErrorEvent,
    data: dataEvent,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteEventsAPI({
    organizationId: userStorage?.organizationId,
    take: 10,
    sort: "DESC",
    queryKey: ["events", "infinite"],
  });

  useEffect(() => {
    let fetching = false;
    if (inView) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  const dataTableEvents = isLoadingEvent ? (
    <LoadingFile />
  ) : isErrorEvent ? (
    <strong>Error find data please try again...</strong>
  ) : dataEvent?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      title="Add your first listing to get started"
      description={`Your listing will appear on your page and be available for supporters to book. You can edit them anytime.`}
    />
  ) : (
    dataEvent?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListEvents item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={"Events"}>
        <div className="flex flex-col flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">

              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">

              <HorizontalNavEvent />

                <div className="flow-root">
                  <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-lg">
                    <div className="px-4 py-8">

                      <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="mt-4 sm:mt-0">
                          <ButtonInput
                            onClick={() => router.push(`/events/create`)}
                            shape="default"
                            type="button"
                            size="normal"
                            loading={false}
                            color={"indigo"}
                          >
                            Create Event
                          </ButtonInput>
                        </div>
                        <div className="mt-4 sm:mt-0">
                          <Input placeholder="Search event" />
                        </div>
                      </div>


                      <div className="divide-y divide-gray-200">
                        {dataTableEvents}
                      </div>

                    </div>
                  </div>
                  {hasNextPage && (
                    <div className="mt-4 text-center justify-center mx-auto">
                      <div className="mt-4 sm:mt-0">
                        <ButtonInput
                          ref={ref}
                          onClick={() => fetchNextPage()}
                          shape="default"
                          type="button"
                          size="large"
                          loading={isFetchingNextPage ? true : false}
                          color={"indigo"}
                          minW="fit"
                        >
                          Load More
                        </ButtonInput>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Events);
