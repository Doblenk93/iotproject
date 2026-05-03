import type { AboutPageData } from '@/types/about';

interface AboutVisionMissionProps {
  data?: AboutPageData;
}

export function AboutVisionMission({ data }: AboutVisionMissionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-[#30CF5D] to-[#7BE097] p-8 sm:p-10 rounded-3xl text-white flex flex-col justify-center shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6">Visi</h3>
            <p className="text-2xl sm:text-xl leading-relaxed font-light italic">
              &ldquo;{data?.VisionAndMission?.Vision || 'Menjadi mitra terdepan dalam solusi pengelolaan limbah berkelanjutan untuk menciptakan masa depan lingkungan yang lebih bersih dan sehat.'}&rdquo;
            </p>
          </div>

          <div className="lg:col-span-3 bg-gradient-to-br from-[#2466AE] to-[#2B7DD4] p-8 sm:p-10 rounded-3xl text-white shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8">Misi</h3>
            <div className="flex flex-col gap-4">
              {data?.VisionAndMission?.Mission?.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 items-start bg-blue-500/15 p-5 rounded-2xl border border-white/10 backdrop-blur-sm transition-all hover:bg-blue-200/10"
                >
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.Value}</h4>
                    <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                      {item.Detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
