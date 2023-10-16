import Breadcrumbs from "../../../components/Breadcrumbs";

const SettingMaster = () => {

    return (

        <>
            <Breadcrumbs title="Common Setting" parentPage="Common Setting" />

            <div class="row">
                <div class="col-xxl-6">
                    <h5 class="mb-3">Animation Nav</h5>
                    <div class="card">
                        <div class="card-body">
                            <p class="text-muted">Use <code>animation-nav</code> class to create animated tabs.</p>

                            <ul class="nav nav-pills animation-nav nav-justified gap-2 mb-3" role="tablist">
                                <li class="nav-item waves-effect waves-light">
                                    <a class="nav-link active" data-bs-toggle="tab" href="#animation-home" role="tab">
                                        Home
                                    </a>
                                </li>
                                <li class="nav-item waves-effect waves-light">
                                    <a class="nav-link" data-bs-toggle="tab" href="#animation-profile" role="tab">
                                        Profile
                                    </a>
                                </li>
                                <li class="nav-item waves-effect waves-light">
                                    <a class="nav-link" data-bs-toggle="tab" href="#animation-messages" role="tab">
                                        Messages
                                    </a>
                                </li>
                                <li class="nav-item waves-effect waves-light">
                                    <a class="nav-link" data-bs-toggle="tab" href="#animation-settings" role="tab">
                                        Settings
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content text-muted">
                                <div class="tab-pane active" id="animation-home" role="tabpanel">
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            Raw denim you probably haven't heard of them jean shorts Austin.
                                            Nesciunt tofu stumptown aliqua, retro synth master cleanse.
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible.
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="animation-profile" role="tabpanel">
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="animation-messages" role="tabpanel">
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            Each design is a new, unique piece of art birthed into this world, and while you have the opportunity to be creative and make your own style choices.
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="animation-settings" role="tabpanel">
                                    <div class="d-flex mt-2">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            After gathering lots of different opinions and graphic design basics, I came up with a list of 30 graphic design tips that you can start implementing.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-6">
                    <h5 class="mb-3">Nav with Badge</h5>
                    <div class="card">
                        <div class="card-body">
                            <p class="text-muted">Example of nav tabs with badge wrapped in nav item.</p>

                            <ul class="nav nav-tabs nav-justified mb-3" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#nav-badge-home" role="tab" aria-selected="false">
                                        Explore
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link align-middle" data-bs-toggle="tab" href="#nav-badge-profile" role="tab" aria-selected="false">
                                        Profile <span class="badge bg-success">Done</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link align-middle" data-bs-toggle="tab" href="#nav-badge-messages" role="tab" aria-selected="false">
                                        Messages <span class="badge bg-danger rounded-circle">5</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" data-bs-toggle="tab" href="#nav-badge-settings" role="tab" aria-selected="true">
                                        Settings
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content text-muted">
                                <div class="tab-pane active" id="nav-badge-home" role="tabpanel">
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            Raw denim you probably haven't heard of them jean shorts Austin.
                                            Nesciunt tofu stumptown aliqua, retro synth master cleanse.
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible.
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="nav-badge-profile" role="tabpanel">
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="nav-badge-messages" role="tabpanel">
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            Each design is a new, unique piece of art birthed into this world, and while you have the opportunity to be creative and make your own style choices.
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="nav-badge-settings" role="tabpanel">
                                    <div class="d-flex mt-2">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <div class="flex-shrink-0">
                                            <i class="ri-checkbox-circle-fill text-success"></i>
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                            After gathering lots of different opinions and graphic design basics, I came up with a list of 30 graphic design tips that you can start implementing.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}
export default SettingMaster;