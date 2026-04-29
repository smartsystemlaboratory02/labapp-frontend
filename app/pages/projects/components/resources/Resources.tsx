import { itemVariants } from "~/motionVariants";
import { DocumentCloud } from "iconsax-reactjs";
import AddResourceModal from "./AddResourceModal";
import SectionHeader from "~/components/ui/SectionHeader";
import { motion } from "framer-motion";
import type { ProjectResourceLink } from "~/services/projects/types";
import ResourceLink from "./ResourceLink";

const Resources = ({
  projectId,
  resources,
}: {
  projectId: string;
  resources: ProjectResourceLink[];
}) => {
  return (
    <motion.section className="space-y-5" variants={itemVariants}>
      <div className="flex items-center justify-between">
        <SectionHeader
          icon={<DocumentCloud size="18" variant="Bold" />}
          label="Project Submissions"
        />
        <AddResourceModal projectId={projectId} />
      </div>

      <div className="grid gap-2">
        {resources.map((resource, i) => (
          <ResourceLink
            key={i}
            title={resource.title}
            type={resource.type}
            url={resource.resource_link}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default Resources;
