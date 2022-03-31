import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Wysiwyg from "./components/Wysiwyg";

const name = pluginPkg.strapi.name;

    export default (strapi) => {
      const pluginDescription =
        pluginPkg.strapi.description || pluginPkg.description;
      const icon = pluginPkg.strapi.icon;

      const plugin = {
        blockerComponent: null,
        blockerComponentProps: {},
        description: pluginDescription,
        icon,
        id: pluginId,
        injectedComponents: [],
        isReady: true,
        isRequired: pluginPkg.strapi.required || false,
        mainComponent: null,
        name,
        preventComponentRendering: false,
        trads: {},
      };
      strapi.registerField({ type: "wysiwyg", Component: Wysiwyg });
      return strapi.registerPlugin(plugin);
    };
