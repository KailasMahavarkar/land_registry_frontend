import { useEffect, useState } from "react";
import Tree from "react-d3-tree";
// import Tree from "react-hierarchy-tree-graph";

import { complexChain, simpleChain } from "../../data/dummy.data";

import { Link, useParams, useSearchParams } from "react-router-dom";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { complexTreeInterface, simpleTreeInterface } from "../../types/type";

const SearchTokenResultPage = () => {
	const [sblock, setSimpleBlock] = useState<simpleTreeInterface>({
		name: "Loading...",
		attributes: {} as any,
		children: [],
	});
	const [cblock, setComplexBlock] = useState<complexTreeInterface>({
		name: "Loading...",
		attributes: {} as any,
		children: [],
	});

	const params = useParams();

	useEffect(() => {
		const token = params?.token;

		const simpleBlock = simpleChain.chain.find(
			(x: any) => x.attributes?.token === token
		);

		const complexBlock = complexChain.chain.find(
			(x: any) => x.attributes?.token === token
		);

		if (simpleBlock !== undefined) {
			setSimpleBlock({
				name: simpleBlock.name,
				attributes: simpleBlock.attributes as any,
				children: simpleBlock.children as any,
			});
		}

		if (complexBlock !== undefined) {
			setComplexBlock({
				name: complexBlock.name,
				attributes: complexBlock.attributes as any,
				children: complexBlock.children as any,
			});
		}
	}, []);

	return (
		<div className="flex flex-col min-h-full auto-center prose max-w-none my-5 w-full ">
			<h2>Token Tree: {sblock?.attributes?.token}</h2>
			<div className="flex flex-col w-full h-[600px] shadow bg-white border-2">
				{sblock && (
					<Tree
                        orientation="vertical"
                        shouldCollapseNeighborNodes={true}
						separation={{
							siblings: 3,
							nonSiblings: 5,
						}}
                        nodeSize={{
                            x: 200,
                            y: 200
                        }}
						data={sblock}
						rootNodeClassName="node__root"
						branchNodeClassName="node__branch"
						leafNodeClassName="node__leaf"
					/>
				)}
			</div>
			<div className="w-full max-w-[80%] mt-5">
				<h3>Owner Documents</h3>
				<table className="table table-zebra w-full">
					<thead>
						<tr>
							<th>Name</th>
							<th>Document Hash</th>
							<th>Document Link</th>
						</tr>
					</thead>
					<tbody>
						{cblock &&
							cblock.attributes?.ownerDocuments &&
							cblock.attributes?.ownerDocuments.map((x) => (
								<tr>
									<td>{x.documentName}</td>
									<td>{x.documentHash}</td>
									<td>
										{x.documentLinks.map((y, index) => (
											<a href={y}>
												<button className="btn btn-primary btn-md m-2">
													{x.documentName +
														" " +
														index}
												</button>
											</a>
										))}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>

			<div className="w-full max-w-[80%] mt-5">
				<h3>Land Documents</h3>
				<table className="table table-zebra w-full">
					<thead>
						<tr>
							<th>Name</th>
							<th>Document Hash</th>
							<th>Document Link</th>
						</tr>
					</thead>
					<tbody>
						{cblock &&
							cblock.attributes?.landDocuments &&
							cblock.attributes?.landDocuments.map((x) => (
								<tr>
									<td>{x.documentName}</td>
									<td>{x.documentHash}</td>
									<td>
										{x.documentLinks.map((y, index) => (
											<a href={y}>
												<button className="btn btn-primary btn-sm m-2">
													{`${x.documentName} Link ${
														index > 0 ? index : ""
													}`}
												</button>
											</a>
										))}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default SearchTokenResultPage;
