import { useDynamicSvgImport } from '@/hooks/useDynamicSvgImport';

interface IProps {
  iconName: string;
  sx?: React.SVGProps<SVGSVGElement>;
}

function SvgIcon(props: IProps) {
  const { iconName, sx } = props;
  const { loading, Icon } = useDynamicSvgImport(iconName);

  return (
    <>
      {loading && (
        <div className="rounded-full bg-slate-400 animate-pulse h-8 w-8" />
      )}
      {Icon && <Icon {...sx} />}
    </>
  );
}

export default SvgIcon;
