import { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { projectProps, Projects } from "../object";
import Widget from "./Widget";

const ProjectsCarousel = () => {
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [projects, setProjects] = useState(new Projects([]).toFilteredArray());
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView,
    spacing: 10,
    loop: false,
    initial: 0,
  });

  const getWidth = () => {};

  useEffect(() => {
    const projects = new Projects([], true);
    projects.__init__().then(() => {
      setProjects(projects.toArray());
    });
  }, []);

  return (
    <div className="w-full">
      <h4 className="mb-4">Projects</h4>
      <div ref={sliderRef} className="keen-slider">
        {projects.map((project) => {
          if (!project) return;
          const { icon, description, badge, language, name, path, updatedAt, key }: projectProps = project;

          return (
            <Widget
              Key={key}
              icon={icon}
              description={description}
              badge={badge}
              language={language}
              name={name}
              path={path}
              updatedAt={updatedAt}
              key={key}
              className="keen-slider__slide"
              style={{ aspectRatio: "2 / 1" }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsCarousel;
