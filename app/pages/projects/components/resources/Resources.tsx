import { itemVariants } from "~/motionVariants";
import { DocumentCloud } from "iconsax-reactjs";
import AddResourceModal from "./AddResourceModal";
import SectionHeader from "~/components/ui/SectionHeader";
import { motion } from "framer-motion";

const Resources = ({
  projectId,
  resources,
}: {
  projectId: string;
  resources: any;
}) => {
  //TODO: CHhange to resource type
  return (
    <motion.section className="space-y-5" variants={itemVariants}>
      <div className="flex items-center justify-between">
        <SectionHeader
          icon={<DocumentCloud size="18" variant="Bold" />}
          label="Project Submissions"
        />
        <AddResourceModal projectId={projectId} />
      </div>

      {/* <div className="grid gap-2">
              {PROJECT_MOCK.submissions.docs.map((doc, i) => (
                <ResourceLink
                  key={i}
                  title={doc.filename}
                  icon={<DocumentText size="18" />}
                  type="doc"
                />
              ))}
              {PROJECT_MOCK.submissions.links.map((link, i) => (
                <ResourceLink
                  key={i}
                  title={link.title}
                  icon={<Link1 size="18" />}
                  type="link"
                />
              ))}
            </div> */}
    </motion.section>
  );
};

export default Resources;
