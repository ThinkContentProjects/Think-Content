import useDirectory from "@/src/hooks/useDirectory";
import useWorkspaceData from "@/src/hooks/useWorkspaceData";
import { Flex, Icon, Image, MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

type NotificationMenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

// add the person to the group 
const handleClick = async () => 
{

};

const NotificationMenuListItem: React.FC<NotificationMenuListItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  const router = useRouter();
  const { joinWorkspace } = useWorkspaceData();

  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{ bg: "gray.100" }}
      onClick={() => {router.push(link); joinWorkspace(workspaceData)}}
    >
      <Flex align="center">
        {imageURL ? (
          <Image src={imageURL} borderRadius="full" boxSize="18px" mr={2} />
        ) : (
          <Icon as={icon} fontSize={20} mr={2} color={iconColor} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};

export default NotificationMenuListItem;
